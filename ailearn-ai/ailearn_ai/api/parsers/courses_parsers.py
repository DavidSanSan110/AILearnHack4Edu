from flask_restx import reqparse, inputs

courses_parser = reqparse.RequestParser()
courses_parser.add_argument('subject', type=str, required=True, help='Course subject')
courses_parser.add_argument('difficulty', type=int, required=True, help='Course difficulty')
courses_parser.add_argument('isSupervised', type=inputs.boolean, required=True, help='Supervised course')