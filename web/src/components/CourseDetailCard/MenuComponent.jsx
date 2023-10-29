import {
    Box,
    Text,
    Accordion, 
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    Divider,
    Icon,
    Image
}
from "@chakra-ui/react"

import { BiSolidTrophy, BiSolidCheckCircle} from 'react-icons/bi'

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function MenuComponent(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLessonView = (section_id, lesson_id) => {
        dispatch({ type: 'UPDATE_SECTION_ID', section_id: section_id })
        dispatch({ type: 'UPDATE_LESSON_ID', lesson_id: lesson_id })
        const minLessonId = Math.min(...props.course.sections.filter((section) => section.id === section_id)[0].lessons.map((lesson) => lesson.id))
        const maxLessonId = Math.max(...props.course.sections.filter((section) => section.id === section_id)[0].lessons.map((lesson) => lesson.id))
        dispatch({ type: 'UPDATE_LESSON_MIN', lesson_min: minLessonId })
        dispatch({ type: 'UPDATE_LESSON_MAX', lesson_max: maxLessonId })
        navigate('/lesson')
    }

    //Each user will have score, full name, and profile picture
    let mockupRanking = [
        {
            "score": 230,
            "fullName": "Alberto García",
            "profilePicture": "data:image/jpeg;base64,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"
        },
        {
            "score": 190,
            "fullName": "Ana Martín",
            "profilePicture": "data:image/jpeg;base64,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"
        },
        {
            "score": 85,
            "fullName": "Maria Perez",
            "profilePicture": "https://img.freepik.com/free-photo/young-female-african-american-student-with-diploma-poses-outdoorsxa_627829-3967.jpg"
        }
    ]





    return (
        <Box
            maxWidth={'70vw'}
            marginTop={10}
            >
            
            <Accordion 
                allowMultiple
                >
                
                {props.course.issv && (
                    <AccordionItem
                        border= {'2px solid'}
                        borderRadius={14}
                        margin={6}
                        padding={2}
                        >
                            <Box
                                display={'flex'} 
                                justifyContent={'space-between'} 
                                alignItems={'center'}
                                _focus={{ boxShadow: 'none' }}
                                _hover={{ bg: 'gray.600' }}
                                borderRadius={14}
                            >
                                <AccordionButton
                                    _hover={{  }}
                                    >
                                        <Text 
                                            as="span" 
                                            textAlign='left'
                                            fontWeight={'bold'}
                                            fontSize={'xl'}
                                            
                                        >
                                            Ranking alumnos
                                        </Text>      
                                        <AccordionIcon/>
                                </AccordionButton>
                                <TrophyIcon/>
                            </Box>

                            <AccordionPanel pb={4}>
                                {mockupRanking.map((student, index) => (
                                    <Box 
                                        display={'flex'} 
                                        justifyContent={'space-between'} 
                                        alignItems={'center'}
                                        marginTop={10}
                                        key={index}
                                    >
                                        <Box display="flex" alignItems="center">
                                            <Text 
                                                fontWeight={'bold'}
                                                fontSize={'lg'}
                                                marginRight={5}
                                            >
                                                {index + 1}
                                            </Text>
                                            <Image src={student.profilePicture} alt={student.fullName} boxSize="50px" borderRadius="full" marginRight={5} />
                                            <Text 
                                                fontWeight={'bold'}
                                                fontSize={'lg'}
                                                color={index === 0 ? 'green.500' : 'inherit'}
                                            >
                                                {student.fullName}
                                            </Text>
                                        </Box>
                                        <Text 
                                            fontWeight={'bold'}
                                            fontSize={'lg'}
                                            marginRight={5}
                                            color={index === 0 ? 'green.500' : 'inherit'}
                                        >
                                            {student.score} pts
                                        </Text>
                                    </Box> 
                                ))}
                            </AccordionPanel>
                    </AccordionItem>
                )}

                <Text fontSize="2xl" fontWeight="bold" mb={6} marginTop={10}>Secciones</Text>
                {props.course.sections.map((section, index) => (
                    <AccordionItem
                    border= {'2px solid'}
                    borderRadius={14}
                    margin={6}
                    padding={2}
                    >
                        <Box
                            display={'flex'} 
                            justifyContent={'space-between'} 
                            alignItems={'center'}
                            key={index}
                            _focus={{ boxShadow: 'none' }}
                            _hover={{ bg: 'gray.600' }}
                            borderRadius={14}
                        >
                            <AccordionButton
                                _hover={{}}    
                            >
                                    <Text 
                                        as="span" 
                                        textAlign='left'
                                        fontWeight={'bold'}
                                        fontSize={'xl'} 
                                    >
                                        {section.title}
                                    </Text>      
                                    <AccordionIcon/>
                            </AccordionButton>
                            {section.progress === 100 && <CompletedIcon/>}
                        </Box>
                        
                        <AccordionPanel pb={4} mb={2}>
                            <Text p={2}>{section.text}</Text>
                            <Divider margin={5}  size={'xl'}/>
                            {section.lessons.map((lesson, index) => (
                                
                                    <Box 
                                        display={'flex'} 
                                        justifyContent={'space-between'} 
                                        alignItems={'center'}
                                        key={index}
                                        p={1}
                                    >
                                        <Text 
                                            onClick={() => handleLessonView(section.id, lesson.id)}
                                            fontWeight={'bold'}
                                            _hover={{color: 'blue.500', cursor: 'pointer'}}
                                            fontSize={'lg'}
                                            marginLeft={5}
                                            as='u'
                                        >
                                            {lesson.title}
                                        </Text>
                                        <CompletedIcon hidden={!lesson.isDone}/>
                                    </Box> 
                                
                                
                            ))}
                        </AccordionPanel>
                    </AccordionItem>       
                ))}
            </Accordion>            
        </Box>
    );
}
export default MenuComponent;

function CompletedIcon(props) {
    return(
        <Icon
            w={10}
            h={10}
            marginTop={3}
            marginRight={5}
        >
            <BiSolidCheckCircle color="#2B6CB0" hidden={props.hidden}/>
        </Icon>
    )
}

function TrophyIcon() {
    return(
        <Icon
            w={12}
            h={12}
            marginTop={4}
            marginRight={5}
        >
            <BiSolidTrophy color="#2B6CB0"/>
        </Icon>
    )
}