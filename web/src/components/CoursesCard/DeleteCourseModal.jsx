import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    IconButton,
    Box,
    Text,
} from "@chakra-ui/react"

import { BiSolidTrash } from 'react-icons/bi'


function DeleteCourseModal({handleDelete}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton
                margin={'2%'}
                alignSelf={'center'}
                backgroundColor={'blue.300'}
                variant='solid'
                colorScheme='blue'
                icon={<BiSolidTrash />}
                onClick={onOpen} 
                mr={2}
            />
            
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader marginTop={10}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Text>¿Estás seguro de que quieres borrar este curso?</Text>
                    </Box>
                </ModalHeader>
                
    
                <ModalBody marginBottom={10} marginTop={5}>
                    <Box display={'flex'} justifyContent={'center'} marginLeft={10} >
                        <Button colorScheme={'red'} mr={3} variant={'solid'} onClick={() => {handleDelete(); onClose()}} >
                            Borrar
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose} variant={'outline'}>
                            Cancelar
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}
export default DeleteCourseModal