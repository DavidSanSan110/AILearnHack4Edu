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
    Input,
    Button,
    IconButton,
    Box,
} from '@chakra-ui/react';
import { useState } from 'react'
import { BiImport } from "react-icons/bi";


export const AddCourseModal = ({handleJoinCourse}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [value, setValue] = useState('1')
    const [code, setCode] = useState('')

    return (
        <Box>
            <IconButton
                backgroundColor={'blue.300'}
                variant={'solid'}
                colorScheme={'blue'}
                icon={<BiImport />}
                onClick={onOpen} />

            <Modal
                size={'xl'}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader align={'center'}>Introduce el código del curso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={4}>
                        <FormControl>
                            <Input ref={initialRef} placeholder='Escribe el código del curso' size={'xl'} fontSize={'3xl'} onChange={(e) => setCode(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button backgroundColor='#B3EFFF' mr={1} colorScheme='blue' onClick={() => { handleJoinCourse(code); onClose() }} >
                            Unirse
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}