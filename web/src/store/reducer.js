import storage from 'redux-persist/lib/storage';

const initialState = {
    course_id: null,
    section_id: null,
    lesson_id: null,
    lesson_min: null,
    lesson_max: null,
    role: null,
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_COURSE_ID': return {
            ...state,
            course_id: action.course_id,
        }
        case 'UPDATE_SECTION_ID': return {
            ...state,
            section_id: action.section_id,
        }
        case 'UPDATE_LESSON_ID': return {
            ...state,
            lesson_id: action.lesson_id,
        }
        case 'UPDATE_LESSON_MIN': return {
            ...state,
            lesson_min: action.lesson_min,
        }
        case 'UPDATE_LESSON_MAX': return {
            ...state,
            lesson_max: action.lesson_max,
        }
        case 'UPDATE_ROLE': return {
            ...state,
            role: action.role,
        }
        case 'RESET_STORE': 
            storage.removeItem('persist:root');
            return initialState;

        default: return state;
    }
}



