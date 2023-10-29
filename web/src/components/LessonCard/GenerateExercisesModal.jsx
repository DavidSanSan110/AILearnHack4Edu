import { useDisclosure } from '@chakra-ui/hooks'
import { 
    Button,
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Box,
    Radio,
    RadioGroup,
    Text,
    Stack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper

 } from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'


function GenerateExercisesModal({sendDataToParent}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let exercisesGenerated = false;

    const handleClick = () => {
        // Call the function passed from the parent with the data
        exercisesGenerated = true;
        sendDataToParent(exercisesGenerated);
        onClose();
    };

    return (
        <>
        <Button colorScheme="blue" variant="solid" rightIcon={<AddIcon/>} onClick={onOpen}>
            Generar ejercicios
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Generar ejercicos</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box display={'flex'} flexDirection={'column'} alignContent={'center'}>
                    <Box display={'flex'} flexDirection={'row'} margin={5} justifyContent={'space-between'}>
                        <Text>Numero de ejercicios</Text>
                        <NumberInput marginLeft={5} defaultValue={1} keepWithinRange={true} min={1} max={9}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} alignContent={'baseline'} margin={5} justifyContent={'space-between'}>
                        <Text>Dificultad</Text>
                        <Box>
                            <RadioGroup aria-describedby='Cursos' colorScheme='blue'>
                                <Stack direction='row'>
                                    <Radio value='1' defaultChecked>Básico</Radio>
                                    <Radio value='2'>Intermedio</Radio>
                                    <Radio value='3'>Avanzado</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </Box>
                </Box>
            </ModalBody>
  
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleClick} variant={'solid'}>
                    Generar
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
    )
}
export default GenerateExercisesModal