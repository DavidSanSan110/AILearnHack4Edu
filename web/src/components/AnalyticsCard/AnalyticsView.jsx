import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Text,
    Stack,
    StackDivider,
    Table,
    Tbody,
    Thead,
    Image,
    Td,
    Tr
} from '@chakra-ui/react';
import { StudentCard } from './StudentCard'
import NavigationBar from '../shared/NavigationBar'
import perfil1 from '../../assets/perfil1.png'
import perfil2 from '../../assets/perfil2.png'
import perfil3 from '../../assets/perfil3.png'
import perfil4 from '../../assets/perfil4.png'
import perfil5 from '../../assets/perfil5.png'
import { BiErrorCircle } from "react-icons/bi";


let mockUpAnalytics = {
    "alumnos": [
        {
            "id": 1,
            "nombre": "Jose Ángel Pedrosa",
            "ejerciciosResueltos": 245,
            "precisionEjercicios": 0.8,
            "tiempoMedio": 120,
            "rendimiento": 0.9,
            "enRiesgoAbandono": false,
            "tiempooActivo": "1h 30m",
        },
        {
            "id": 2,
            "nombre": "Maria Rodriguez",
            "ejerciciosResueltos": 300,
            "precisionEjercicios": 0.9,
            "tiempoMedio": 90,
            "rendimiento": 0.95,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 3,
            "nombre": "Juan Perez",
            "ejerciciosResueltos": 10,
            "precisionEjercicios": 0.6,
            "tiempoMedio": 150,
            "rendimiento": 0.3,
            "enRiesgoAbandono": false,
            "tiempoActivo": "30m"
        },
        {
            "id": 4,
            "nombre": "Ana Garcia",
            "ejerciciosResueltos": 150,
            "precisionEjercicios": 0.7,
            "tiempoMedio": 100,
            "rendimiento": 0.8,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 5,
            "nombre": "Carlos Sanchez",
            "ejerciciosResueltos": 200,
            "precisionEjercicios": 0.85,
            "tiempoMedio": 80,
            "rendimiento": 0.9,
            "enRiesgoAbandono": false,
            "tiempoActivo": "1h 30m"
        },
        {
            "id": 6,
            "nombre": "Laura Fernandez",
            "ejerciciosResueltos": 100,
            "precisionEjercicios": 0.75,
            "tiempoMedio": 110,
            "rendimiento": 0.4,
            "enRiesgoAbandono": true,
            "tiempoActivo": "1h 30m"
        },
        {
            "id": 7,
            "nombre": "Pedro Gomez",
            "ejerciciosResueltos": 50,
            "precisionEjercicios": 0.5,
            "tiempoMedio": 200,
            "rendimiento": 0.2,
            "enRiesgoAbandono": false,
            "tiempoActivo": "30m"
        },
        {
            "id": 8,
            "nombre": "Sofia Hernandez",
            "ejerciciosResueltos": 400,
            "precisionEjercicios": 0.95,
            "tiempoMedio": 70,
            "rendimiento": 0.98,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 9,
            "nombre": "Javier Torres",
            "ejerciciosResueltos": 75,
            "precisionEjercicios": 0.65,
            "tiempoMedio": 130,
            "rendimiento": 0.4,
            "enRiesgoAbandono": false,
            "tiempoActivo": "1h 30m"
        },
        {
            "id": 10,
            "nombre": "Lucia Diaz",
            "ejerciciosResueltos": 250,
            "precisionEjercicios": 0.8,
            "tiempoMedio": 95,
            "rendimiento": 0.85,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"

        },
        {
            "id": 11,
            "nombre": "Miguel Torres",
            "ejerciciosResueltos": 100,
            "precisionEjercicios": 0.7,
            "tiempoMedio": 110,
            "rendimiento": 0.5,
            "enRiesgoAbandono": false,
            "tiempoActivo": "1h 30m"
        },
        {
            "id": 12,
            "nombre": "Sara Fernandez",
            "ejerciciosResueltos": 150,
            "precisionEjercicios": 0.9,
            "tiempoMedio": 85,
            "rendimiento": 0.7,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 13,
            "nombre": "Pablo Rodriguez",
            "ejerciciosResueltos": 50,
            "precisionEjercicios": 0.6,
            "tiempoMedio": 180,
            "rendimiento": 0.3,
            "enRiesgoAbandono": true,
            "tiempoActivo": "30m"
        },
        {
            "id": 14,
            "nombre": "Carmen Garcia",
            "ejerciciosResueltos": 300,
            "precisionEjercicios": 0.8,
            "tiempoMedio": 100,
            "rendimiento": 0.9,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 15,
            "nombre": "Jorge Sanchez",
            "ejerciciosResueltos": 200,
            "precisionEjercicios": 0.85,
            "tiempoMedio": 75,
            "rendimiento": 0.8,
            "enRiesgoAbandono": false,
            "tiempoActivo": "1h 30m"
        },
        {
            "id": 16,
            "nombre": "Laura Torres",
            "ejerciciosResueltos": 75,
            "precisionEjercicios": 0.7,
            "tiempoMedio": 130,
            "rendimiento": 0.5,
            "enRiesgoAbandono": false,
            "tiempoActivo": "1h 30m"
        },
        {
            "id": 17,
            "nombre": "Marta Diaz",
            "ejerciciosResueltos": 250,
            "precisionEjercicios": 0.9,
            "tiempoMedio": 90,
            "rendimiento": 0.85,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 18,
            "nombre": "David Perez",
            "ejerciciosResueltos": 10,
            "precisionEjercicios": 0.5,
            "tiempoMedio": 220,
            "rendimiento": 0.2,
            "enRiesgoAbandono": true,
            "tiempoActivo": "30m"
        },
        {
            "id": 19,
            "nombre": "Sonia Hernandez",
            "ejerciciosResueltos": 400,
            "precisionEjercicios": 0.95,
            "tiempoMedio": 65,
            "rendimiento": 0.98,
            "enRiesgoAbandono": false,
            "tiempoActivo": "2h 30m"
        },
        {
            "id": 20,
            "nombre": "Javier Garcia",
            "ejerciciosResueltos": 100,
            "precisionEjercicios": 0.8,
            "tiempoMedio": 105,
            "rendimiento": 0.4,
            "enRiesgoAbandono": false,
            "tiempoActivo": "1h 30m"
        },
    ]
};

let perfil = [perfil1, perfil2, perfil3, perfil4, perfil5];
function AnalyticsView() {

    // Os dejo el mockup con los datos a utilizar en esta vista, podeis añadirles más datos si quereis
    // No mostreis ese JSON tal cual, mostradlo de forma que quede guay y que muestre la información de manera útil
    // Por ejemplo hacer gráficas, mostrar los alumnos que están en riesgo de abandono, etc.
    // Esta vista es completamente mockup, así que podeis liaros a poner botones o lo que considereis que puede quedar bien sin problema.

    return (
        <Box>
            <NavigationBar />
            <Box height={'100vh'} width={'100vw'} display='flex' justifyContent='space-between'>


                    <Card width={'60%'} height={'85%'} m={'2%'} top={'10%'} borderRadius={'20px'}  >
                        <CardHeader backgroundColor={'blue.800'} borderRadius={'20px 20px 0 0 '} color={'white'}>
                            <Text align={'center'} fontSize={'2xl'}>ALUMNOS</Text>
                        </CardHeader>
                        <CardBody overflow={'scroll'}>
                    <Table width={'100%'} cellPadding={'15%'} cellSpacing={'5%'} overflow={'scroll'}>
                        <Thead backgroundColor={'blue.800'} color={'white'} >
                            <Tr borderRadius={'20px'}>
                                <td width={'16%'} mx={'2%'}>Foto</td>
                                <td  width={'16%'} mx='2%' >Nombre</td>
                                <td width={'16%'} mx='2%'>Ejercicios Resueltos</td>
                                <td width={'16%'} mx='2%'>Precisión</td>
                                <td  width={'16%'} mx='2%'>Tiempo Medio</td>
                                <td  width={'16%'} mx='2%'>Rendimiento</td>
                                <td  width={'16%'} mx='2%'>Riesgo</td>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {mockUpAnalytics.alumnos.map(
                                (alumno, index) => {


                                    return (
                                        <tr>
                                            <td  width={'16%'} alignItems={'center'}>
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
                                            </td>
                                            <td width={'16%'} overflow={'scroll'} whiteSpace={'nowrap'} mx={'10%'} >{alumno.nombre}</td>
                                            <td  width={'16%'} overflow={'scroll'} whiTeSpace={'nowrap'} >{alumno.ejerciciosResueltos}</td>
                                            <td  width={'16%'} overflow={'scroll'} whiTeSpace={'nowrap'} >{alumno.precisionEjercicios*100}%</td>
                                            <td  width={'16%'} overflow={'scroll'} whiTeSpace={'nowrap'} >{alumno.tiempoMedio}</td>
                                            <td  width={'16%'} overflow={'scroll'} whiTeSpace={'nowrap'} >{alumno.rendimiento*100}%</td>



                                            <td width={'16%'} >
                                                <BiErrorCircle color={'red'} visibility={alumno.enRiesgoAbandono ? 'visible' : 'hidden'} />
                                            </td>

                                        </tr>);
                                })}



                        </Tbody>
                    </Table>

                        </CardBody>
                    </Card>

                <Stack width={'40%'} height={'80%'} m={'5%'} top={'10%'} >
                    <Card width={'100%'} height={'48%'} m={'2%'} top={'10%'} borderRadius={'20px'}  >
                        <CardHeader backgroundColor={'blue.800'} borderRadius={'20px 20px 0 0 '} color={'white'}>
                            <Text align={'center'} fontSize={'2xl'}>RIESGO DE ABANDONO</Text>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} >
                                {mockUpAnalytics.alumnos.map(
                                    (alumno, index) => {
                                        if (alumno.enRiesgoAbandono)
                                            return (<StudentCard risck={true} nombre={alumno.nombre} ejerciciosResueltos={alumno.ejerciciosResueltos} precisionEjercicios={alumno.precisionEjercicios} tiempoMedio={alumno.tiempoMedio} rendimiento={alumno.rendimiento} enRiesgoAbandono={alumno.enRiesgoAbandono} index={index}/>);
                                    })}
                            </Stack>

                        </CardBody>
                    </Card>
                    <Card width={'100%'} height={'48%'} m={'2%'} top={'10%'} borderRadius={'20px'}  >
                        <CardHeader backgroundColor={'blue.800'} borderRadius={'20px 20px 0 0 '} color={'white'}>
                            <Text align={'center'} fontSize={'2xl'}>ESTADISTICAS ALUMNADO</Text>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} mt={'2%'}>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'start'}>
                                    <Text fontWeight={'bold'} fontSize={'2xl'} fontStyle={'italic'}>Media Ejercicios:</Text>
                                    <Text ml={'2%'} fontSize={'2xl'}> 220</Text>
                                </Box>

                                <Box display={'flex'} flexDirection={'row'} justifyContent={'start'}>
                                    <Text fontWeight={'bold'} fontSize={'2xl'} fontStyle={'italic'}>Porcentaje de Acierto: </Text>
                                    <Text ml={'2%'} fontSize={'2xl'} fontStyle={'italic'}> 76%</Text>
                                </Box>


                                <Box display={'flex'} flexDirection={'row'} justifyContent={'start'}>
                                    <Text fontWeight={'bold'} fontSize={'2xl'} fontStyle={'italic'}>Timpo Medio: </Text>
                                    <Text ml={'2%'} fontSize={'2xl'} fontStyle={'italic'}> 0.68s</Text>
                                </Box>




                            </Stack>

                        </CardBody>
                    </Card>
                </Stack>
            </Box>
        </Box>
    )


}
export default AnalyticsView