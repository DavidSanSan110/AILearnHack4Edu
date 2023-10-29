


import { useNavigate } from 'react-router'
import { Box, Image, Text } from '@chakra-ui/react'
import { BiErrorCircle } from "react-icons/bi";
import perfil1 from '../../assets/perfil1.png'
import perfil2 from '../../assets/perfil2.png'
import perfil3 from '../../assets/perfil3.png'
import perfil4 from '../../assets/perfil4.png'
import perfil5 from '../../assets/perfil5.png'
export const StudentCard = ({risck = false, nombre = 'nombre', ejerciciosResueltos = '100', precisionEjercicios = 0.850, tiempoMedio = 80, rendimiento = 0.5, enRiesgoAbandono = false, index}) => {

    const navigate = useNavigate()
    let perfil = [perfil1, perfil2, perfil3, perfil4, perfil5];

    return (
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} my={'2%'} alignItems={'center'}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}  justifyContent={'start'}>
                    <Image
                        src={perfil[index%5]}
                        alt="Our Logo"
                        color="accent"
                        height={10}
                        width="auto"
                        align={'center'}
                        mr={'5%'}
                    borderRadius={'150px'}
                    />
                    <Text display={'flex'} whiteSpace={'nowrap'} mx={'10%'} minWidth={'80%'}>{nombre}</Text>
                </Box>
                <Box>

                {
                    !risck ? 
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
                        <Text display={'flex'} whiteSpace={'nowrap'} minWidth={'80%'}>{ejerciciosResueltos}</Text>
                        <Text display={'flex'} whiteSpace={'nowrap'} minWidth={'80%'}>{precisionEjercicios}</Text>
                        <Text display={'flex'} whiteSpace={'nowrap'} minWidth={'80%'}>{tiempoMedio}</Text>
                        <Text display={'flex'} whiteSpace={'nowrap'} minWidth={'80%'}>{rendimiento}</Text>
                    </Box> 
                    : null
                }
                </Box>

                <BiErrorCircle color={'red'} visibility={enRiesgoAbandono ? 'visible' : 'hidden'}/>


            </Box>
        
    )
}
