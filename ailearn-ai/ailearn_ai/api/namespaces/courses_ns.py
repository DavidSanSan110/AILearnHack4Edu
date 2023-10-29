import flask
import datetime
from flask_restx import Resource

from ailearn_ai import logger
from ailearn_ai.api.v1 import api
from ailearn_ai.core import cache, limiter
from ailearn_ai.utils import handle400error, handle404error, handle500error

from ailearn_ai.api.models.courses_models import courses_model_create_input, courses_model_create_output
from ailearn_ai.api.parsers.courses_parsers import courses_parser
from ailearn_ai.model.courses_model import CoursesModel


model = CoursesModel()
courses_ns = api.namespace('courses', description='Courses namespace')

@courses_ns.route('/create')
class CoursesCreateClass(Resource):

    @api.expect(courses_model_create_input)
    @api.response(404, 'Data not found')
    @api.response(500, 'Unhandled errors')
    @api.response(400, 'Invalid parameters')
    #@api.marshal_with(courses_model_create_output)
    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def post(self):
        """
        Create a course
        """

        global model

        try:
            params = courses_parser.parse_args()
        except:
            return handle400error(courses_ns, 'Malformed request. Please, check the request at /v1')
        
        try:
            output = model.create_course(subject=params['subject'], difficulty=params['difficulty'], isSupervised=params['isSupervised'])
            return {'course': output}
        except Exception as e:
            logger.error(e)
            return handle500error(courses_ns, e)