import * as React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Button,
    IconButton,
    RadioGroup,
    Stack,
    Radio,
    Text,
    Box,
    Switch,
    useToast,
    Divider
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'


export const NewCourseModal = ({handleAddCourse}) => {

    const role = useSelector((state) => state.role);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [subject, setSubject] = useState('')
    const [difficulty, setDifficulty] = useState('1')
    const [issv, setIssv] = useState(false)
    const [filename, setFilename] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)


    const hiddenFileInput = useRef(null);  

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const toast = useToast()

    const handleFileUpload = (e) => {
        const fileUploaded = e.target.files[0]
        setFilename(fileUploaded.name)
        console.log(fileUploaded)
        setIsLoaded(true)
        toast({
            title: 'Archivo subido',
            description: 'El archivo se ha subido correctamente',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <Box ml={'1%'}>
            <IconButton
                backgroundColor={'blue.300'}
                variant={'solid'}
                colorScheme={'blue'}
                icon={<AddIcon />}
                onClick={onOpen} />

            <Modal
                isOpen={isOpen}
                onClose={onClose}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crea tu curso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder='Escribe un nombre para tu curso' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Tema</FormLabel>
                            <Input placeholder='Indica el tema sobre el que quieres que trate' onChange={(e) => setSubject(e.target.value)} value={subject} />
                        </FormControl>

                        <RadioGroup aria-describedby='Cursos' onChange={(e) => setDifficulty(e.target.value)} value={difficulty} mt={4}>
                            <Text marginBottom={2}>Dificultad</Text>
                            <Stack direction='row'>
                                <Radio value='1'>Fácil</Radio>
                                <Radio value='2'>Intermedio</Radio>
                                <Radio value='3'>Difícil</Radio>
                            </Stack>
                        </RadioGroup>

                        {
                            role === "admin" && (
                                <Box>
                                    <Divider mt={6} mb={6} />
                                <FormControl display={'flex'} justifyContent={'flex-start'} alignItems={'center'} mt={4}>
                                    <FormLabel htmlFor='issv' mb='0'>
                                        Supervisado
                                    </FormLabel>
                                    <Switch id='issv' onChange={() => setIssv(!issv)} value={issv} />
                                </FormControl>
                                {/*Permite que el profesor pueda subir un archivo para hacer fine-tuning al modelo de ia, aceptar carga de datos, etc*/}
                                <FormControl mt={4}>
                                    <Button onClick={handleClick} isDisabled={isLoaded} leftIcon={<AddIcon />} colorScheme='blue' variant='outline'> Subir archivo </Button>
                                    <input type="file" ref={hiddenFileInput} onChange={handleFileUpload} style={{display: 'none'}} />
                                    <Text fontSize={'sm'} mt={2}>{filename}</Text>
                                </FormControl>
                                </Box>
                            )
                        }


                    </ModalBody>

                    <ModalFooter>
                        <Button backgroundColor='#B3EFFF' mr={3} colorScheme='blue' onClick={() => {handleAddCourse(subject, difficulty, issv); onClose()}}>
                            Crear
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    )
}