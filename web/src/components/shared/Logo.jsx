import { Image } from '@chakra-ui/react'

import logo from '../../assets/logo3.svg'


function Logo() {

  return(
    <Image 
      src={logo} 
      alt="Our Logo"
      color="accent"
      height={16}
      width="auto"
      align={'center'}/>
  )
}

export default Logo
