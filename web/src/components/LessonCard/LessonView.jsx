import { useState } from 'react';
import { Box, Text, Button, Textarea, Divider, RadioGroup, Stack, Radio, Spinner, HStack } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import NavigationBar from '../shared/NavigationBar'
import GenerateExercisesModal from './GenerateExercisesModal'
import { BiSolidEditAlt, BiEditAlt } from 'react-icons/bi'
import { BiSolidCheckCircle } from 'react-icons/bi'

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { graphqlRequest } from '../../helpers';
import { sendRequest } from '../../helpers';

function LessonView() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const role = useSelector((state) => state.role);
    const course_id = useSelector((state) => state.course_id);
    const lesson_id = useSelector((state) => state.lesson_id);
    const lesson_min = useSelector((state) => state.lesson_min);
    const lesson_max = useSelector((state) => state.lesson_max);
    const [lesson, setLesson] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const handlePreviousNext = async (direction, isLast) => {
        if (direction === "previous") {
            dispatch({ type: 'UPDATE_LESSON_ID', lesson_id: lesson_id - 1 })
        } else if (direction === "next") {
            dispatch({ type: 'UPDATE_LESSON_ID', lesson_id: lesson_id + 1 })
            const response = await sendRequest('lessons/pgSetDoneLesson', { lesson_id: lesson_id, course_id: course_id })
            console.log(response)
        }

        if (isLast) {
            navigate('/courseDetail')
        }
    }

    useEffect(() => {
        const getLesson = async () => {
            console.log(lesson_id)
            const response = await graphqlRequest(
                `
                {
                    lesson (id: ${lesson_id}) {
                        id
                        section_id
                        title
                        text
                        exercises {
                                    id
                                    lesson_id
                                    type
                                    question
                                    explanation
                                    options
                                    correct_option
                                    answer {
                                        id
                                        exercise_id
                                        user_id
                                        answer
                                        iscorrect
                                        feedback
                                    }
                        }
                        isDone
                
                    }
                }
                `
            )
            //Convert options from "{Option1, Option2, Option3}" to ["Option1", "Option2", "Option3"]
            response.lesson.exercises.forEach((exercise, index) => {
                if (exercise.type === "multipleChoiceExercise") {
                    exercise.options = exercise.options.substring(1, exercise.options.length - 1).split(',').map(option => option.trim());
                }
            })
            console.log(response)
            setLesson(response.lesson)

            if(response.lesson.exercises.length !== 0){

                response.lesson.exercises.forEach((exercise, index) => {
                    //only set radio buttons for multiple choice exercises
                    if (exercise.type === "multipleChoiceExercise") {
                        setRadioStates((prevState) => ({
                            ...prevState,
                            [exercise.id]: "",
                        }));
                    } else if (exercise.type === "openExercise") {
                        setTextAreaStates((prevState) => ({
                            ...prevState,
                            [exercise.id]: "",
                        }));
                    }
                });

                response.lesson.exercises.forEach((exercise, index) => {
                    const newButton = { id: exercise.id, clicked: false };
                    setSubmitButtons([...submitButtons, newButton]);
                    setIsCheckingOpen([...isCheckingOpen, false]);
                    setIsCheckingMultiple([...isCheckingMultiple, false]);

                    //Add to isChecking array a new false value
                    setIsChecking((prevState) => ({
                        ...prevState,
                        [exercise.id]: false,
                    }));
                })
            }

            setIsLoading(false)
        }
        getLesson()
    }, [lesson_id])

    const mockLesson = {
        "title": "Punteros",
        "text": "Los punteros son un concepto fundamental en el lenguaje de programación C y se utilizan para manejar la memoria de manera directa. Un puntero es una variable que almacena la dirección de memoria de otra variable. Aquí hay algunas cosas clave que debes saber sobre los punteros en C",
        "exercises": []
    }

    const [exercisesGenerated, setDataFromModal] = useState(false);
    const [submitButtons, setSubmitButtons] = useState([]);
    const [isChecking, setIsChecking] = useState({});
    const [isCheckingOpen, setIsCheckingOpen] = useState([]);
    const [isCheckingMultiple, setIsCheckingMultiple] = useState([]);
    const [radioStates, setRadioStates] = useState({});
    const [textAreaStates, setTextAreaStates] = useState({});

    const handleGroupChange = (groupId, value) => {
        //Log de values de los radio buttons
        setRadioStates((prevState) => ({
            ...prevState,
            [groupId]: value,
        }));
        console.log(radioStates)
    };
    const handleTextAreaChange = (textAreaId, value) => {
        setTextAreaStates((prevState) => ({
            ...prevState,
            [textAreaId]: value,
        }));
        console.log(textAreaStates)
    };

    const handleDataFromModal = async (flag) => {
        setDataFromModal(flag);
        console.log("Generating exercises...")
        //wait 1 sec
        await sleep(1000);
        console.log("Exercises generated")
        let mockExercises = [
            {
                "id": 1,
                "name": "Ejercicio 1",
                "type": "multipleChoiceExercise",
                "multipleChoiceExercise": {
                    "question": "¿Cuál es la salida del siguiente programa?: printf(\"%d\", 5 + 3 * 2);",
                    "options": [
                        "11",
                        "16",
                        "13",
                        "15"
                    ],
                    "correctAnswer": "11"
                },
                "isSubmited": false
            },
            {
                "id": 2,
                "name": "Ejercicio 2",
                "type": "multipleChoiceExercise",
                "multipleChoiceExercise": {
                    "question": "¿Cuál es la salida del siguiente programa?: printf(\"%d\", 5 + 3 * 2);",
                    "options": [
                        "1",
                        "15",
                        "12",
                        "16"
                    ],
                    "correctAnswer": "12"
                },
                "isSubmited": false
            },
            {
                "id": 3,
                "name": "Ejercicio 3",
                "type": "openExercise",
                "openExercise": {
                    "question": "¿Cuál es la salida del siguiente programa?: printf(\"%d\", 5 + 3 * 2);",
                    "correctAnswer": "11"
                },
                "isSubmited": false
            }
        ]

        //Set radio buttons
        mockExercises.forEach((exercise, index) => {
            //only set radio buttons for multiple choice exercises
            if (exercise.type === "multipleChoiceExercise") {
                setRadioStates((prevState) => ({
                    ...prevState,
                    [exercise.id]: "",
                }));
            }
        });

        //Set text areas
        mockExercises.forEach((exercise, index) => {
            //only set text areas for open exercises
            if (exercise.type === "openExercise") {
                setTextAreaStates((prevState) => ({
                    ...prevState,
                    [exercise.id]: "",
                }));
            }
        });



        //Set submit buttons
        mockExercises.forEach((exercise, index) => {
            console.log(exercise.id)
            const newButton = { id: exercise.id, clicked: false };
            setSubmitButtons([...submitButtons, newButton]);
            setIsCheckingOpen([...isCheckingOpen, false]);
            setIsCheckingMultiple([...isCheckingMultiple, false]);

            //Add to isChecking array a new false value
            setIsChecking((prevState) => ({
                ...prevState,
                [exercise.id]: false,
            }));
        })

        // Refresh lesson with new exercises
        setLesson({ ...lesson, exercises: mockExercises });
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit (exerciseId, indexOfButton, type) {

        /*
        if (type === "openExercise") {
            setIsCheckingOpen(isCheckingOpen.map((value, index) => {
                if (index === indexOfButton) {
                    return true;
                } else {
                    return value;
                }
            }));
        } else if (type === "multipleChoiceExercise") {
            setIsCheckingMultiple(isCheckingMultiple.map((value, index) => {
                if (index === indexOfButton) {
                    return true;
                } else {
                    return value;
                }
            }));
        }
        */

        console.log(isChecking)
        console.log(indexOfButton)
        console.log(exerciseId)

        //Set isChecking[exerciseId] to true
        setIsChecking((prevState) => ({
            ...prevState,
            [exerciseId]: true,
        }));

        //SEt a timeout of 2 sec
        await sleep(2000);

        console.log("Submitting exercise " + exerciseId)
            ;
        setSubmitButtons(submitButtons.map(button => {
            if (button.id === exerciseId) {
                return { ...button, clicked: true };
            } else {
                return button;
            }
        }
        ));

        setLesson({
            ...lesson, exercises: lesson.exercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    return { ...exercise, isSubmited: true };
                } else {
                    return exercise;
                }
            }
            )
        });
        /*
        if (type === "openExercise") {
            setIsCheckingOpen(isCheckingOpen.map((value, index) => {
                if (index === indexOfButton) {
                    return false;
                } else {
                    return value;
                }
            }));
        } else if (type === "multipleChoiceExercise") {
            setIsCheckingMultiple(isCheckingMultiple.map((value, index) => {
                if (index === indexOfButton) {
                    return false;
                } else {
                    return value;
                }
            }));
        }*/
        //Set isChecking[exerciseId] to false
        setIsChecking((prevState) => ({
            ...prevState,
            [exerciseId]: false,
        }));
    }
    /*
        function handleRadioButtonChange(exerciseId, value) {
            console.log("Changing radio button " + exerciseId + " to " + value)
            
            setRadioButton(radioButtons.map(radioButton => {
                if (radioButton.id === exerciseId) {
                    return {...radioButton, value: value};
                } else {
                    return radioButton;
                }
            }
            ));
    
            setLesson({...lesson, exercises: lesson.exercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    return {...exercise, isSubmited: true};
                } else {
                    return exercise;
                }
            }
            )});
        }
    */
    return (
        <Box
            display="flex"
            height="100%"
            flexDirection="column"
            justifyContent="center"
            marginTop={10}
            marginBottom={20}
        >
            <Box>
                <NavigationBar />
                { role === "admin" && (
                <Button 
                    colorScheme="blue"
                    variant="solid"
                    marginTop={5}
                    marginRight={10}
                    mt={16}
                    float={'right'}
                    leftIcon={<BiEditAlt />}
                >
                    Edit Lesson
                </Button>
                )}
            </Box>

            {/*MAIN COMPONENT */}
            <Box
                marginTop={role === "admin" ? 10 : 20}
                marginLeft={20}
            >
                <Text
                    fontSize="6xl"
                    fontWeight="bold"
                >
                    {lesson.title}
                </Text>
                <Box
                    margin={10}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        {lesson.text}
                    </Text>
                </Box>

                <Divider marginTop={5} />

                {/*EXERCISES */}
                <Box marginTop={10} fontWeight={'bold'} fontSize={'lg'}>


                    <Box>
                        {(lesson.exercises === undefined || lesson.exercises.length === 0) ? (
                            <Box marginTop={5} display={'flex'} justifyContent={'center'}>

                                {!exercisesGenerated ? (
                                    <GenerateExercisesModal sendDataToParent={handleDataFromModal} />

                                ) : (
                                    <Box display={'flex'}>
                                        <Text>Generating your exercises</Text>
                                        <Spinner marginLeft={5} color={'blue.300'} speed={'1.5s'} thickness={'4px'} />
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            lesson.exercises.map((exercise, index) => {
                                if (exercise.type === "openExercise") {
                                    return (
                                        <Box>
                                            <Box key={exercise.id} marginTop={15} marginLeft={5} display={'flex'} flexDirection={'column'}>
                                                <Text fontSize="xl" fontWeight="bold" marginTop={5}>
                                                    {"Ejercicio " + (index + 1)}
                                                </Text>
                                                <Text fontSize="md" marginTop={5}>{exercise.question}</Text>
                                                <Textarea
                                                    size="sm"
                                                    placeholder="Write your answer here"
                                                    marginTop={5}
                                                    maxW={800}
                                                    onChange={(event) => handleTextAreaChange(exercise.id, event.target.value)}
                                                    isDisabled={exercise.isSubmited}
                                                />
                                                {!exercise.isSubmited && (<Button colorScheme="blue" variant="solid" marginTop={5} maxW={100} onClick={() => { handleSubmit(exercise.id) }} isLoading={isChecking[exercise.id]}>Corregir</Button>)}
                                                {/*}
                                                {exercise.isSubmited && (<><HStack><Text marginTop={5} fontWeight={'bold'}>Correción: {Math.random() > 0.5 ? "Correcta" : "Incorrecta"}</Text>{Math.random() > 0.5 && <BiSolidCheckCircle color={'green'} size={30} />}</HStack></>)}
                                                {exercise.isSubmited && (<Text marginTop={3} fontWeight={'bold'}>Feedback: {Math.random() > 0.5 ? "Considero que tu respuesta es correcta" : "Considero que tu respuesta es incorrecta"}</Text>)}
                                                */}
                                                {exercise.isSubmited && (<><HStack><Text marginTop={5} fontWeight={'bold'}>Correción: Correcta</Text><BiSolidCheckCircle color={'green'} size={30} /></HStack></>)}
                                                {exercise.isSubmited && (<Text marginTop={3} fontWeight={'bold'}>Feedback: Considero que tu respuesta es correcta</Text>)}
                                            </Box>
                                            <Divider marginTop={5} />
                                        </Box>
                                    );
                                } else if (exercise.type === "multipleChoiceExercise") {
                                    return (
                                        <Box>
                                            <Box key={exercise.id} marginTop={15} marginLeft={5} display={'flex'} flexDirection={'column'}>
                                                <Text fontSize="xl" fontWeight="bold" marginTop={5}>
                                                    {"Ejercicio " + (index + 1)}
                                                </Text>
                                                <Text fontSize="md" marginTop={5}>{exercise.question}</Text>
                                                <Box marginTop={5}>
                                                    <RadioGroup onChange={(value) => handleGroupChange(exercise.id, value)} value={radioStates[exercise.id]}>
                                                        <Stack>
                                                            {exercise.options.map((option, index) => (
                                                                <>
                                                                    <Radio key={option} value={option} isDisabled={exercise.isSubmited}>
                                                                        {option}
                                                                    </Radio>
                                                                </>
                                                            ))}
                                                        </Stack>
                                                    </RadioGroup>
                                                </Box>
                                                {!exercise.isSubmited && (<Button colorScheme="blue" variant="solid" marginTop={5} maxW={100} onClick={() => { handleSubmit(exercise.id) }} isLoading={isChecking[exercise.id]}>Corregir</Button>)}
                                                {exercise.isSubmited && (<Text marginTop={5} fontWeight={'bold'}>Result: {Math.random() > 0.5 ? "Correct" : "Incorrect"}</Text>)}
                                                {exercise.isSubmited && (<Text marginTop={5} fontWeight={'bold'}>Feedback: {Math.random() > 0.5 ? "Good job" : "Try again"}</Text>)}
                                            </Box>
                                            <Divider marginTop={5} />
                                        </Box>
                                    );
                                }
                            })
                        )}
                    </Box>
                </Box>
            </Box>

            {/*NAVIGATION BUTTONS */}
            <Box
                marginTop={5}
                display={'flex'}
                flexDirection={'row'}
                paddingLeft={50}
                paddingRight={50}
            >
                <Button leftIcon={<ArrowBackIcon />} colorScheme='blue' variant='solid' hidden={lesson_id === lesson_min} marginInlineEnd={'auto'} alignSelf={'flex-start'} onClick={() => handlePreviousNext("previous", false)}>
                    Previous
                </Button>
                <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' variant='solid' marginInlineStart={'auto'} alignSelf={'flex-end'} onClick={() => handlePreviousNext("next", lesson_id === lesson_max)}>
                    {lesson_id === lesson_max ? "Finish Section" : "Next"}
                </Button>
            </Box>
        </Box>

    )
}
export default LessonView