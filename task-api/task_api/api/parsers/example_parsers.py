from flask_restx import reqparse, inputs

example_parser = reqparse.RequestParser()
example_parser.add_argument('username', type=str, required=True, help='Username')
example_parser.add_argument('password', type=str, required=True, help='Password')