from flask_restx import fields

from ailearn_ai.api.v1 import api

# Data models

open_exercise = api.model('OpenExercise', {
    'question': fields.String(required=True, description='Exercise question'),
    'explanation': fields.String(required=True, description='Exercise explanation'),
})

multiple_choice_exercise = api.model('MultipleChoiceExercise', {
    'question': fields.String(required=True, description='Exercise question'),
    'explanation': fields.String(required=True, description='Exercise explanation'),
    'options': fields.List(fields.String),
    'answer': fields.String(required=True, description='Exercise answer'),
})

'''
exercise = api.model('Exercise', {
    'name': fields.String(required=True, description='Exercise name'),
    'type': fields.String(required=True, description='Exercise type'),
    'openExercise': fields.Nested(open_exercise),
    'multipleChoiceExercise': fields.Nested(multiple_choice_exercise),
})
'''
exercise = api.model('Exercise', {
    'type': fields.String(required=True, description='Exercise type'),
    'question': fields.String(required=True, description='Exercise question'),
    'explanation': fields.String(required=True, description='Exercise explanation'),
    'options': fields.List(fields.String),
    'correct_option': fields.String(required=True, description='Exercise answer'),
})

# Input models => al pulsar boton no antes

exercises_model_create_input = api.model('ExercisesModelCreateInput', {
    'subject': fields.String(required=True, description='Course subject'),
    'text': fields.String(required=True, description='Exercise text'),
    'difficulty': fields.Integer(required=True, description='Exercise difficulty'),
    'number': fields.Integer(required=True, description='Number of exercises'),
})

exercises_model_validate_input = api.model('ExercisesModelValidateInput', {
    'question': fields.String(required=True, description='Exercise question'),
    'explanation': fields.String(required=True, description='Exercise explanation'),
    'answer': fields.String(required=True, description='Exercise answer'),
})

# Output models

exercises_model_create_output = api.model('ExercisesModelCreateOutput', {
    'exercises': fields.List(fields.Nested(exercise))
})

exercises_model_validate_output = api.model('ExercisesModelValidateOutput', {
    'explanation': fields.String(required=True, description='Exercise explanation'),
    'result': fields.Boolean(required=True, description='Exercise result'),
})

