from flask_restx import reqparse, inputs

exercises_create_parser = reqparse.RequestParser()
exercises_create_parser.add_argument('subject', type=str, required=True, help='Course subject')
exercises_create_parser.add_argument('text', type=str, required=True, help='Exercise text')
exercises_create_parser.add_argument('difficulty', type=int, required=True, help='Exercise difficulty')
exercises_create_parser.add_argument('number', type=int, required=True, help='Number of exercises')

exercises_validate_parser = reqparse.RequestParser()
exercises_validate_parser.add_argument('question', type=str, required=True, help='Exercise question')
exercises_validate_parser.add_argument('explanation', type=str, required=True, help='Exercise explanation')
exercises_validate_parser.add_argument('answer', type=str, required=True, help='Exercise answer')

