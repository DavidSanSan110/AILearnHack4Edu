import flask
import datetime
from flask_restx import Resource

from task_api import logger
from task_api.api.v1 import api
from task_api.core import cache, limiter
from task_api.utils import handle400error, handle404error, handle500error

from task_api.api.models.tasks_models import task_model_create_input, task_model_create_output
from task_api.api.parsers.tasks_parsers import task_parser_create
from task_api.model.tasks_model import TasksModel


model = TasksModel()
tasks_ns = api.namespace('tasks', description='Tasks operations')

@tasks_ns.route('/create')
class TasksCreate(Resource):

    @api.expect(task_model_create_input)
    @api.response(404, 'Data not found')
    @api.response(500, 'Unhandled errors')
    @api.response(400, 'Invalid parameters')
    @api.marshal_with(task_model_create_output)
    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def post(self):
        """
        Create task endpoint
        """

        global model

        try:
            params = task_parser_create.parse_args()
        except:
            return handle400error(tasks_ns, 'Malformed request. Please, check the request at /v1')
        
        try:
            output = model.create_task(url=params['url'], method=params['method'], params=params['params'], course_id=params['course_id'])
            return {'id': output}
        except Exception as e:
            logger.error(e)
            return handle500error(tasks_ns, e)
        
@tasks_ns.route('/find_pending')
class TasksFindPending(Resource):

    @api.response(404, 'Data not found')
    @api.response(500, 'Unhandled errors')
    @api.response(400, 'Invalid parameters')
    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def get(self):
        """
        Find pending task endpoint
        """

        global model

        try:
            output = model.find_pending()
            if output is None:
                return handle404error(tasks_ns, 'No pending tasks')
            return output.serialize()
        except Exception as e:
            logger.error(e)
            return handle500error(tasks_ns, e)
