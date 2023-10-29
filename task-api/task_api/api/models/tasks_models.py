from flask_restx import fields

from task_api.api.v1 import api

task_model_create_input = api.model('TaskModelCreateInput', {
    'course_id': fields.String(required=True, example=1, description='Course id'),
    'url': fields.String(required=True, example='http://localhost:10003/task-api/v1/example/getDataCourse', description='URL to be called'),
    'method': fields.String(required=True, example='GET', description='HTTP method'),
    'params': fields.Raw(required=True, example='{}', description='Parameters to be sent'),
})

task_model_create_output = api.model('TaskModelCreateOutput', {
    'id': fields.String(required=True, description='Task id'),
})
