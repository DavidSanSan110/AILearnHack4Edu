from flask_restx import reqparse, inputs

task_parser_create = reqparse.RequestParser()
task_parser_create.add_argument('course_id', type=int, required=True, help='Course id')
task_parser_create.add_argument('url', type=str, required=True, help='Task url')
task_parser_create.add_argument('method', type=str, required=True, help='Task method')
task_parser_create.add_argument('params', type=dict, required=True, help='Task params')
