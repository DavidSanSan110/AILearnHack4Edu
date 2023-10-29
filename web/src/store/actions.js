const resetStore = () => {
    return {
        type: 'RESET_STORE'
    }
}

const updateRole = (role) => {
    return {
        type: 'UPDATE_ROLE',
        role: role
    }
}

const updateCourseId = (course_id) => {
    return {
        type: 'UPDATE_COURSE_ID',
        course_id: course_id
    }
}

const updateSectionId = (section_id) => {
    return {
        type: 'UPDATE_SECTION_ID',
        section_id: section_id
    }
}

const updateLessonId = (lesson_id) => {
    return {
        type: 'UPDATE_LESSON_ID',
        lesson_id: lesson_id
    }
}

const updateLessonMin = (lesson_min) => {
    return {
        type: 'UPDATE_LESSON_MIN',
        lesson_min: lesson_min
    }
}

const updateLessonMax = (lesson_max) => {
    return {
        type: 'UPDATE_LESSON_MAX',
        lesson_max: lesson_max
    }
}

export { updateCourseId, updateSectionId, updateLessonId, updateLessonMax, updateLessonMin, updateRole, resetStore }