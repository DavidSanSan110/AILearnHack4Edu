import {
    Progress,
    Stack,
    IconButton,
    Spinner,
    Table,
    Tr,
    Icon
} from '@chakra-ui/react'
import { Heading, Box, Text } from '@chakra-ui/layout'
import { BiSolidTachometer } from "react-icons/bi";
import { MdSupervisedUserCircle } from "react-icons/md";
import { useNavigate } from 'react-router'
import DeleteCourseModal from './DeleteCourseModal';
import ShareCourseModal from './ShareCourseModal';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const BoxCard = ({ id, name, tema, code, difficulty, isSupervised, progress, isGenerated, numEnrolledStudents, handleDelete }) => {

    const dispatch = useDispatch();
    //const role = "admin";
    const role = useSelector((state) => state.role);

    const navigate = useNavigate()

    const handleCourseView = () => {
        dispatch({ type: 'UPDATE_COURSE_ID', course_id: id })
        navigate('/courseDetail')
    }

    if (isGenerated) {
        return (
            // Course has already been generated
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <Table>
                    <Tr>
                        <td width={'30%'}>
                            <Stack direction={'row'} >
                            <Box _hover={{ color: 'blue.300' }} cursor={'pointer'} onClick={handleCourseView}>
                                <Heading size={'ml'} textTransform='uppercase'>
                                    {name}
                                </Heading>
                                <Text paddingTop={'2'} size={'ml'}>
                                    {tema}
                                </Text>
                            </Box>
                            {isSupervised && (
                                <Icon color={'blue.300'} boxSize={5} alignSelf={'center'} as={MdSupervisedUserCircle} ml={6} />
                            )}
                            </Stack>
                        </td>
                        <td width={'65%'} align={'center'}>
                            {
                                role === "admin" && isSupervised ? (
                                    <Text alignSelf={'center'} size={'ml'} mr={48}>
                                        {numEnrolledStudents} estudiantes
                                    </Text>
                                ) : (
                                    <Stack width={'70%'} direction={'row'} mr={48}>
                                        <Progress value={progress} size={'lg'} align={'left'} alignSelf={'center'} colorScheme='blue' width={'90%'} borderRadius={'5vh'} />
                                        <Text>{progress}%</Text>
                                    </Stack>
                                )
                            }
                        </td>

                        <td width={'5%'}>
                            <Box alignSelf={'lef'} display={'flex'} flexDirection={'row'}>
                                {/*Show analytics*/}
                                {role === "admin" && (
                                    <IconButton
                                        margin={'2%'}
                                        alignSelf={'center'}
                                        backgroundColor={'blue.300'}
                                        variant='solid'
                                        colorScheme='blue'
                                        icon={<BiSolidTachometer />}
                                        onClick={() => navigate('/analytics')}
                                        mr={2}
                                    />
                                )
                                }

                                {/*Share course*/}
                                {role === "admin" && (<ShareCourseModal code={code} />)}

                                {/*Delete course*/}
                                <DeleteCourseModal handleDelete={() => handleDelete(id, isSupervised)} />
                            </Box>
                        </td>
                    </Tr>
                </Table>
            </Box>
        )
    }
    else {
        // Course is being generated
        return (
            <Box display={'flex'} justifyContent={'flex-start'} width={'100%'} marginTop={3} marginBottom={3}>
                <Text>
                    Tu curso de {name} está siendo generado
                </Text>
                <Spinner thickness={'4px'} speed={'1s'} marginLeft={5} color={'blue.300'} />
            </Box>
        )
    }
}
