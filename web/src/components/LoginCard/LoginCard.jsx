import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'

import Logo from '../shared/Logo'

import { sendRequest } from '../../helpers'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

function LoginCard() {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  //TODO: response handling with status codes
  const handleLogin = async (e) => {

    e.preventDefault()

    const data = {
      email: email,
      password: password
    }
    const response = await sendRequest('auth/pglogin', data)
    console.log(response)

    dispatch({ type: 'UPDATE_ROLE', role: response.data.role })

    if (response.message === 'Login successful!') {
      console.log('Login successful')
      Cookies.set('token', response.data.token)
      navigate('/main')
    } else {
      console.log('Login failed')
    }
  }


  return (
    <Container
      maxW="lg"
      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'xl',
              }}
            >
              AILearn
            </Heading>
            <Text color="fg.muted">
              ¿No tienes una cuenta? <Link href="#" _hover={{ color: 'blue.500', textDecoration: 'underline' }}>Regístrate</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={{
            base: 'transparent',
            sm: 'bg.surface',
          }}
          boxShadow={{
            base: 'none',
            sm: 'md',
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </FormControl>
              {/*<PasswordField />*/}
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Recordarme</Checkbox>
              <Button variant="text" size="sm">
                ¿Olvidaste tu contraseña?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={handleLogin}>Iniciar sesión</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container >
  )
}

export default LoginCard
