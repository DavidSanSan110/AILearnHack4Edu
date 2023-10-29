import { Box, Divider, Text } from '@chakra-ui/react'

import HorizontalProgressBar from './HorizontalProgressBar'
import MenuComponent from './MenuComponent'
import NavigationBar from '../shared/NavigationBar'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { graphqlRequest } from '../../helpers'

function CourseDetailView() {

    const course_id = useSelector((state) => state.course_id)
    const [course, setCourse] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCourse = async () => {
            console.log(course_id)
            const response = await graphqlRequest(
                `
                {
                    course(id: ${course_id}) {
                        id
                        subject
                        difficulty
                        issv
                        progress
                        sections {
                            id
                            title
                            text
                            progress
                            lessons {
                                id
                                title
                                text
                                isDone
                            }
                        }
                    }
                }`
            )
            console.log(response)
            setCourse(response.course)
            setIsLoading(false)
        }
        getCourse()
    }, [course_id])

    const mockCourse = {
        "name": "C",
        "difficulty": 1,
        "isSupervised": false,
        "progress": 50,
        "sections": [
            {
                "title": "Section 1",
                "text": "This is the text of the section 1",
                "progress": 100,
                "lessons": [
                    {
                        "title": "Lesson 1",
                        "text": "Text 1",
                        "isCompleted": true
                    },
                    {
                        "title": "Lesson 2",
                        "text": "Text 2",
                        "isCompleted": true
                    }
                ]
            },
            {
                "title": "Section 2",
                "text": "This is the text of the section 2",
                "progress": 50,
                "lessons": [
                    {
                        "title": "Lesson 3",
                        "text": "Text 1",
                        "isCompleted": true
                    },
                    {
                        "title": "Lesson 4",
                        "text": "Text 2",
                        "isCompleted": false
                    }
                ]
            }
        ]
    }

    if (!isLoading) {
    return (
        <Box
            display="flex"
            height="100%"
            flexDirection="column"
            justifyContent="center"
        >
            <Box>
                <NavigationBar />
            </Box>
            <Box
                marginTop={40}
                marginLeft={20}
            >
                <Text
                    fontSize="5xl"
                    fontWeight="bold"
                    marginBottom={5}
                >
                    Curso de {course.subject}
                </Text>

                <HorizontalProgressBar progress={course.progress} />
                
                <Divider  marginTop={10} marginBottom={10}/> 

                <MenuComponent course={course} />

                


                
            </Box>
        </Box>

    )
    }
}
export default CourseDetailView