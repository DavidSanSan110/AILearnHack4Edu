from flask_restx import fields

from ailearn_ai.api.v1 import api
from ailearn_ai.api.models.exercises_models import exercise

# Data models

lesson = api.model('Lesson', {
    'title': fields.String(required=True, description='Lesson title'),
    'text': fields.String(required=True, description='Lesson text'),
    'exercises': fields.List(fields.Nested(exercise))
})

section = api.model('Section', {
    'title': fields.String(required=True, description='Section title'),
    'text': fields.String(required=True, description='Section text'),
    'lessons': fields.List(fields.Nested(lesson))
})

course = api.model('Course', {
    'subject': fields.String(required=True, description='Course subject'),
    'difficulty': fields.Integer(required=True, description='Course difficulty'),
    'isSupervised': fields.Boolean(required=True, description='Supervised course'),
    'sections': fields.List(fields.Nested(section))
})

# Input models

courses_model_create_input = api.model('CoursesModelCreateInput', {
    'subject': fields.String(required=True, description='Course subject'),
    'difficulty': fields.Integer(required=True, description='Course difficulty'),
    'isSupervised': fields.Boolean(required=True, description='Supervised course'),
})

# Output models

courses_model_create_output = api.model('CoursesModelCreateOutput', {
    'course': fields.Nested(course)
})

