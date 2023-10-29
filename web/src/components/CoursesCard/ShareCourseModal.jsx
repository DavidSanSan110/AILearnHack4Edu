import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    IconButton,
    Box,
    Text,
    ModalCloseButton,
} from "@chakra-ui/react";

import { BiSolidShare } from 'react-icons/bi'


function ShareCourseModal({code}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton
                margin={'2%'}
                alignSelf={'center'}
                backgroundColor={'blue.300'}
                variant='solid'
                colorScheme='blue'
                icon={<BiSolidShare />}
                onClick={onOpen} 
                mr={2}
            />
            
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader marginTop={10}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Text
                            fontSize={'md'}
                            fontWeight={'slim'}

                        >
                            Comparte este código para compartir el curso:
                        </Text>
                    </Box>
                    <ModalCloseButton />
                </ModalHeader>
                
    
                <ModalBody marginBottom={10} marginTop={5}>
                    <Box display={'flex'} justifyContent={'center'}  >
                        <Text
                            fontSize={'6xl'}
                            fontWeight={'bold'}
                        >
                            {code}
                        </Text>
                    </Box>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}
export default ShareCourseModal