import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    postLogin(email, password);
  }

  async function postLogin(email: string, password: string) {
    try {
      const res = await axios.post('http://localhost:8080/login', {
        username: email,
        password: password,
      });
      updateIsLoggedIn(res.data.isLoggedIn);
    } catch (err: any) {
      if (err) console.error(err);
    }
  }

  function updateIsLoggedIn(isLoggedIn: boolean) {
    // localStorage.isLoggedIn = isLoggedIn; // DELETE THE NEXT TWO LINES TO RESUME AUTHORIZATION
    localStorage.isLoggedIn = true;
    isLoggedIn = true;
    loginRedirect(isLoggedIn)
  }

  function loginRedirect(isLoggedIn: boolean) {
    if (isLoggedIn) {
      navigate('/dash')
    } else {
      navigate('/login') 
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and start planning your next jump!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form
              id='login-form'
              onSubmit={(event: any) => {
                handleSubmit(event);
              }}
            >
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input type='email' name='email' />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'green.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type='submit'
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  Sign in
                </Button>
                <Text align={'center'}>
                  Don't have an account?{' '}
                  <Link as={ReachLink} to='/signup' color={'green.400'}>
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
