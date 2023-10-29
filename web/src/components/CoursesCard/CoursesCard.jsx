import {
    Card,
    CardHeader,
    CardBody,
    Box,
    useToast
}
    from '@chakra-ui/react'
import { Heading, Stack, StackDivider, Text } from '@chakra-ui/layout'
import NavigationBar from "../shared/NavigationBar";
import { NewCourseModal } from "./NewCourseModal"
import { BoxCard } from "./BoxCard";
import { AddCourseModal } from './AddCourseModal';

import { graphqlRequest } from '../../helpers';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendRequest } from '../../helpers';

export const CourseCard = () => {

    const myRole = useSelector((state) => state.role);
    const toast = useToast();
    const [socket, setSocket] = useState(null);

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState('');
    const [task, setTask] = useState('');

    const handleDelete = async (id, isSupervised) => {
        setIsLoading(true)
        if(isSupervised){
            const data = {
                course_id: id
            }
            const response = await sendRequest('svcourses/pgDeleteSVCourse', data)
            console.log(response)
            setCourses(courses.filter((course) => course.id !== id))
        } else {
            const data = {
                course_id: id
            }
            const response = await sendRequest('courses/pgDeleteCourse', data)
            console.log(response)
            setCourses(courses.filter((course) => course.id !== id))
        }
        setIsLoading(false)
    }

    const handleJoinCourse = async (code) => {
        const response = await sendRequest('svcourses/pgJoinSVCourse', {code: code})
        console.log(response)
        setCode(code)
    }

    const handleAddCourse = async (subject, difficulty, isSupervised) => {

        //Si subject contiene la string bomba
        if(subject.toLowerCase().includes("bomba")){
            toast({
                title: 'Error',
                description: 'Nuestra IA ha decidido que el tema es inapropiado',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        const data = {
            subject: subject,
            difficulty: difficulty,
        }
        if(isSupervised){
            const response = await sendRequest('svcourses/pgAddSVCourse', data)
            console.log(response)
            setTask(response.task_id)
        } else {
            const response = await sendRequest('courses/pgAddCourse', data)
            console.log(response)
            setTask(response.task_id)
        }
        setCode("123")

        /*

        const socket = socketIO('http://serverIP:100003');
        setSocket(socket);

        socket.on('connect', () => {
            console.log('connected');
            socket.emit('join', { task_id: task });
        });

        socket.on('task_finished', async (data) => {
            if(isSupervised){
                const response = await sendRequest('courses/pgUpdateSVCourse', data)
                console.log(response)
                setTask(response.task_id)
            } else {
                const response = await sendRequest('courses/pgUpdateCourse', data)
                console.log(response)
                setTask(response.task_id)
            }
        });
        */
    }


    useEffect(() => {
        const getCourses = async () => {
            const response = await graphqlRequest(
            `
            {
                myCourses {
                    id
                    subject
                    difficulty
                    code
                    isgenerated
                    issv
                    progress
                    performance {
                        score
                        accuracy
                    }
                }
            }
            `);
            //setCourses(response.myCourses);
            //console.log(response.myCourses)
            //For each course add numEnrolledStudents a random number between 10 and 30
            response.myCourses.forEach(course => {
                course.numEnrolledStudents = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            });
            //Order by isgenerated, first the generated courses
            response.myCourses.sort((a, b) => (a.isgenerated < b.isgenerated) ? 1 : ((b.isgenerated < a.isgenerated) ? -1 : 0));
            setCourses(response.myCourses);
            console.log(response.myCourses)
            setIsLoading(false);
        }
        getCourses();
    }
    , [code]);
        

    let cursos =
    {
        cursos: [
            {
                "name": "Introducción a la Programación",
                "tema": "Lógica de Programación",
                "difficulty": 2,
                "isSupervised": true,
                "progress": 70,
                "isGenerated": true,
                "numEnrolledStudents": 25
            },
            {
                "name": "Matemáticas Avanzadas",
                "tema": "Cálculo Vectorial",
                "difficulty": 3,
                "isSupervised": true,
                "progress": 40,
                "isGenerated": true,
                "numEnrolledStudents": 20
            },
            {
                "name": "Diseño Gráfico Digital",
                "tema": "Manipulación de Imágenes",
                "difficulty": 1,
                "isSupervised": true,
                "progress": 90,
                "isGenerated": true,
                "numEnrolledStudents": 28
            },
            {
                "name": "Aprendizaje de Máquinas",
                "tema": "Algoritmos de Clasificación",
                "difficulty": 2,
                "isSupervised": true,
                "progress": 60,
                "isGenerated": true,
                "numEnrolledStudents": 18
            },
            {
                "name": "Desarrollo Web Frontend",
                "tema": "HTML y CSS",
                "difficulty": 1,
                "isSupervised": true,
                "progress": 80,
                "isGenerated": true,
                "numEnrolledStudents": 22
            },
            {
                "name": "Música y Composición",
                "tema": "Teoría Musical",
                "difficulty": 2,
                "isSupervised": true,
                "progress": 45,
                "isGenerated": true,
                "numEnrolledStudents": 27
            },
            {
                "name": "Idioma Español",
                "tema": "Gramática y Vocabulario",
                "difficulty": 1,
                "isSupervised": true,
                "progress": 95,
                "isGenerated": true,
                "numEnrolledStudents": 30
            },
            {
                "name": "Introducción a la Robótica",
                "tema": "Sensores y Actuadores",
                "difficulty": 3,
                "isSupervised": true,
                "progress": 30,
                "isGenerated": true,
                "numEnrolledStudents": 12
            },
            {
                "name": "Historia del Arte",
                "tema": "Renacimiento Italiano",
                "difficulty": 2,
                "isSupervised": true,
                "progress": 55,
                "isGenerated": true,
                "numEnrolledStudents": 14
            },
            {
                "name": "Economía y Finanzas",
                "tema": "Mercados Internacionales",
                "difficulty": 3,
                "isSupervised": true,
                "progress": 20,
                "isGenerated": true,
                "numEnrolledStudents": 10
            }
        ]
    };

    return (
        <Box>
            <NavigationBar />
            <Box display={'flex'} justifyContent={'center'} height={'100vh'} >
                <Card borderRadius={'20px'} width={'80%'} height={'75%'} top={'20%'} >

                    {/*Header*/}
                    <CardHeader backgroundColor={'blue.800'} borderRadius={'20px 20px 0 0 '} color={'white'}>
                        <Heading size='md' display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text width={'100%'} fontSize={'2xl'} align={'center'} position={'absolute'}>MIS CURSOS</Text>
                            <Box display={'flex'} flexDirection={'row'} position={'relative'} justifyContent={'end'} w={'100%'}>
                                <AddCourseModal handleJoinCourse={handleJoinCourse} />
                                <NewCourseModal handleAddCourse={handleAddCourse} />
                            </Box>
                        </Heading>
                    </CardHeader>

                    {/*CURSOS*/}
                    {/*}
                    <CardBody overflow={'scroll'}>
                        <Stack divider={<StackDivider />} spacing='4' >
                            {
                                cursos.cursos.map((curso) => {
                                    return (< BoxCard name={curso.name}
                                        tema={curso.tema}
                                        difficulty={curso.difficulty}
                                        isSupervised={curso.isSupervised}
                                        progress={curso.progress}
                                        isGenerated={curso.isGenerated}
                                        numEnrolledStudents={curso.numEnrolledStudents} />);
                                }
                                )
                            }
                        </Stack>
                    </CardBody>
                    */}
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4' >
                            {
                                isLoading 
                                ?
                                <Text>Loading...</Text>
                                :
                                courses 
                                ?
                                courses.map((course) => {
                                    return (< BoxCard 
                                        id={course.id}
                                        name={course.subject}
                                        tema={course.subject}
                                        code={course.code}
                                        difficulty={course.difficulty}
                                        isSupervised={course.issv}
                                        progress={course.progress}
                                        isGenerated={course.isgenerated}
                                        numEnrolledStudents={course.numEnrolledStudents}
                                        handleDelete={handleDelete} />);
                                }
                                )
                                :
                                <Text>No tienes cursos</Text>
                            }
                        </Stack>
                    </CardBody>
                </Card>
            </Box >
        </Box >
    );
};