const courseData = {
    "name": "C",
    "difficulty": 1,
    "withExercises": true,
    "sections": [
        {
            "name": "Section 1",
            "lessons": [
                {
                    "name": "Lesson 1",
                    "text": "Text 1"
                },
                {
                    "name": "Lesson 2",
                    "text": "Text 2"
                }
            ]
        },
        {
            "name": "Section 2",
            "lessons": [
                {
                    "name": "Lesson 3",
                    "text": "Text 1"
                },
                {
                    "name": "Lesson 4",
                    "text": "Text 2"
                }
            ]
        }
    ]
}

const exercisesData = [
    {
        'name': 'Exercise 1',
        'type': 'openExercise',
        'question': 'Question 1',
        'explanation': 'Explanation 1',
        'options': [],
        'correct_option': null
    },
    {
        'name': 'Exercise 2',
        'type': 'multipleChoiceExercise',
        'question': 'Question 2',
        'explanation': 'Explanation 2',
        'options': ['Option 1', 'Option 2', 'Option 3'],
        'correct_option': 'Option 1'
    }
]

export { courseData, exercisesData };