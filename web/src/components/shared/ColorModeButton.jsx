import { useColorMode, IconButton } from '@chakra-ui/react'
import { useState } from 'react';
import { BiMoon } from "react-icons/bi";

export const ColorModeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [colorModeIcon, setColorModeIcon] = useState('BiSun');

    return (
        <header>
            <IconButton
                backgroundColor={'blue.300'}
                variant={'solid'}
                colorScheme={'blue'}
                icon={<BiMoon />}
            />
        </header>
    )
}
