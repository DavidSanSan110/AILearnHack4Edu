import flask
import datetime
from time import sleep
from bson import json_util, ObjectId
import json
from flask_restx import Resource

from task_api import logger
from task_api.api.v1 import api
from task_api.core import cache, limiter
from task_api.utils import handle400error, handle404error, handle500error

from task_api.api.models.example_models import example_model_input, example_model_output
from task_api.api.parsers.example_parsers import example_parser
from task_api.model.example_model import ExampleModel

from task_api import events


model = ExampleModel()
example_ns = api.namespace('example', description='Example namespace')

@example_ns.route('/event')
class ExampleClass(Resource):
    
        @limiter.limit('1000000/hour') 
        @cache.cached(timeout=1, query_string=True)
        def get(self):
            """
            Example endpoint
            """
    
            events.emit_finished_task('123')
    
            return {
                "message": "Event emitted"
            }

@example_ns.route('/example')
class ExampleClass(Resource):

    @api.expect(example_model_input)
    @api.response(404, 'Data not found')
    @api.response(500, 'Unhandled errors')
    @api.response(400, 'Invalid parameters')
    @api.marshal_with(example_model_output)
    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def post(self):
        """
        Example endpoint
        """

        global model

        try:
            params = example_parser.parse_args()
        except:
            return handle400error(example_ns, 'Malformed request. Please, check the request at /v1')
        
        try:
            output = model.example_function(username=params['username'], password=params['password'])
            return {'message': output}
        except Exception as e:
            logger.error(e)
            return handle500error(example_ns, e)
        
@example_ns.route('/getDataCourse')
class ExampleClass(Resource):

    @limiter.limit('1000000/hour') 
    @cache.cached(timeout=1, query_string=True)
    def get(self):
        """
        Example endpoint
        """

        # Simulate a long process sleep for 10 seconds
        sleep(10)

        return {
            "name": "C",
            "difficulty": 1,
            "withExercises": True,
            "sections": [
                {
                    "title": "Section 1",
                    "text": "This is the text of the section 1",
                    "lessons": [
                        {
                            "title": "Lesson 1",
                            "text": "Text 1"
                        },
                        {
                            "title": "Lesson 2",
                            "text": "Text 2"
                        }
                    ]
                },
                {
                    "title": "Section 2",
                    "text": "This is the text of the section 2",
                    "lessons": [
                        {
                            "title": "Lesson 3",
                            "text": "Text 1"
                        },
                        {
                            "title": "Lesson 4",
                            "text": "Text 2"
                        }
                    ]
                }
            ]
        }
    
@example_ns.route('/getDataSVCourse')
class ExampleClass(Resource):
    
        @limiter.limit('1000000/hour') 
        @cache.cached(timeout=1, query_string=True)
        def get(self):
            """
            Example endpoint
            """
    
            # Simulate a long process sleep for 10 seconds
            sleep(10)
    
            return {
                "name": "C",
                "difficulty": 1,
                "withExercises": True,
                "sections": [
                    {
                        "title": "Section 1",
                        "text": "This is the text of the section 1",
                        "lessons": [
                            {
                                "title": "Lesson 1",
                                "text": "Text 1",
                                "exercises": [
                                    {
                                        "type": "openExercise",
                                        "question": "Question 1",
                                        "explanation": "Explanation 1",
                                        "options": [],
                                        "correct_option": None,
                                    },
                                    {
                                        "type": "multipleChoiceExercise",
                                        "question": "Question 2",
                                        "explanation": "Explanation 2",
                                        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                                        "correct_option": "Option 1",
                                    }
                                ]
                            },
                            {
                                "title": "Lesson 2",
                                "text": "Text 2",
                                "exercises": [
                                    {
                                        "type": "openExercise",
                                        "question": "Question 3",
                                        "explanation": "Explanation 3",
                                        "options": [],
                                        "correct_option": None,
                                    },
                                    {
                                        "type": "multipleChoiceExercise",
                                        "question": "Question 4",
                                        "explanation": "Explanation 4",
                                        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                                        "correct_option": "Option 1",
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "title": "Section 2",
                        "text": "This is the text of the section 2",
                        "lessons": [
                            {
                                "title": "Lesson 3",
                                "text": "Text 3",
                                "exercises": [
                                    {
                                        "type": "openExercise",
                                        "question": "Question 5",
                                        "explanation": "Explanation 5",
                                        "options": [],
                                        "correct_option": None,
                                    },
                                    {
                                        "type": "multipleChoiceExercise",
                                        "question": "Question 6",
                                        "explanation": "Explanation 6",
                                        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                                        "correct_option": "Option 1",
                                    }
                                ]
                            },
                            {
                                "title": "Lesson 4",
                                "text": "Text 4",
                                "exercises": [
                                    {
                                        "type": "openExercise",
                                        "question": "Question 7",
                                        "explanation": "Explanation 7",
                                        "options": [],
                                        "correct_option": None,
                                    },
                                    {
                                        "type": "multipleChoiceExercise",
                                        "question": "Question 8",
                                        "explanation": "Explanation 8",
                                        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                                        "correct_option": "Option 1",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }