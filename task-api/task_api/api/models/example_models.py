from flask_restx import fields

from task_api.api.v1 import api

example_model_input = api.model('ExampleModelInput', {
    'username': fields.String(required=True, description='Username'),
    'password': fields.String(required=True, description='Password')
})

example_model_output = api.model('ExampleModelOutput', {
    'message': fields.String(required=True, description='Message')
})

