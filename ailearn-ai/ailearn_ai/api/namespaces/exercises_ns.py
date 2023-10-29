import flask
import datetime
from flask_restx import Resource

from ailearn_ai import logger
from ailearn_ai.api.v1 import api
from ailearn_ai.core import cache, limiter
from ailearn_ai.utils import handle400error, handle404error, handle500error

from ailearn_ai.api.models.exercises_models import exercises_model_create_input, exercises_model_create_output, exercises_model_validate_input, exercises_model_validate_output
from ailearn_ai.api.parsers.exercises_parsers import exercises_create_parser, exercises_validate_parser
from ailearn_ai.model.exercises_model import ExercisesModel


model = ExercisesModel()
exercises_ns = api.namespace('exercises', description='Exercises namespace')

@exercises_ns.route('/create')
class CoursesCreateClass(Resource):

    @api.expect(exercises_model_create_input)
    @api.response(404, 'Data not found')
    @api.response(500, 'Unhandled errors')
    @api.response(400, 'Invalid parameters')
    @api.marshal_with(exercises_model_create_output)
    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def post(self):
        """
        Create exercises
        """

        global model

        try:
            params = exercises_create_parser.parse_args()
        except:
            return handle400error(exercises_ns, 'Malformed request. Please, check the request at /v1')
        
        try:
            output = model.create_exercises(subject=params['subject'], text=params['text'], difficulty=params['difficulty'], number=params['number'])
            return {'exercises': output}
        except Exception as e:
            logger.error(e)
            return handle500error(exercises_ns, e)
        
@exercises_ns.route('/validate')
class CoursesValidateClass(Resource):

    @api.expect(exercises_model_validate_input)
    @api.response(404, 'Data not found')
    @api.response(500, 'Unhandled errors')
    @api.response(400, 'Invalid parameters')
    @api.marshal_with(exercises_model_validate_output)
    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def post(self):
        """
        Validate exercises
        """

        global model

        try:
            params = exercises_validate_parser.parse_args()
        except:
            return handle400error(exercises_ns, 'Malformed request. Please, check the request at /v1')
        
        try:
            output = model.validate_exercise(question=params['question'], explanation=params['explanation'], answer=params['answer'])
            return output
        except Exception as e:
            logger.error(e)
            return handle500error(exercises_ns, e)