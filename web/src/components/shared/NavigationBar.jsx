import { HamburgerIcon, } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    useColorMode,
    Text
} from '@chakra-ui/react';
import { BiLogOut, BiUser, BiMoon, BiSun } from "react-icons/bi";
import { useNavigate } from 'react-router'
import Logo from './Logo';

function NavigationBar() {
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box>
            <Box pos={"fixed"} width={"full"} height={'10%'} top={0} zIndex={100}>
                <Flex bg={'blue.900'} p={2} width={"100%"}>
                    <Box ml={8} width={'10%'} >
                        <Logo />
                    </Box>
                    <Spacer />
                    <Text color={'white'} alignSelf={'center'} fontSize={'3xl'} fontWeight={'bold'} mr={24}>AILearn</Text>
                    <Spacer />
                    <Center>
                        <Menu>
                            <MenuButton>
                                <IconButton
                                    backgroundColor={'blue.300'}
                                    variant={'solid'}
                                    colorScheme={'blue'}
                                    mr={6}
                                    aria-label='See menu'
                                    icon={<HamburgerIcon />}
                                />
                            </MenuButton>
                            <MenuList p={2}>
                                {/*colorMode === 'light' ? (setColorModeIcon(<BiSun />)) : setColorModeIcon(<BiMoon />)*/}
                                <MenuItem icon={<BiUser />} backgroundColor={'blue.300'} my={2} width={'100%'} borderRadius={10} textAlign={'center'} color={'black'} onClick={async () => { navigate('/main') }}>Mi cuenta</MenuItem>
                                <MenuItem icon={<BiLogOut />} backgroundColor={'blue.300'} my={2} width={'100%'} borderRadius={10} textAlign={'center'} color={'black'} onClick={async () => { navigate('/') }} >Cerrar sesion</MenuItem>
                                <MenuItem icon={colorMode === 'light' ? <BiMoon /> : <BiSun />} backgroundColor={'blue.300'} my={2} width={'100%'} borderRadius={10} textAlign={'center'} color={'black'} onClick={toggleColorMode}>
                                    {colorMode === 'light' ? 'Modo Noche' : 'Modo Día'}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Center>

                </Flex>
            </Box>
        </Box>
    );
}
export default NavigationBar