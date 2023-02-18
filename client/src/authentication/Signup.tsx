import {
  Flex,
  Link,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

type FormData = {
  first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [capState, setCapState] = useState(0)
  const toast = useToast();
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  function handleChange(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields}
    })
  }

  function validateRecaptcha(value: any) {
    setCapState(value);
  }

  const signupURL = "http://localhost:8080/signup";
  async function addUser(data: FormData) {
    if (capState === 0) {
      toast({
        title: "ERROR",
        description: "The recaptcha is invalid.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return
    } 
    try {
      await axios.post(signupURL, {
        headers: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
        },
      });
      toast({
        title: "Thanks!",
        description: "We've added you as a new user.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      if (err) {
        toast({
          title: "Whoops!",
          description: "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      };
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            for unlimited access to exit data from around the world!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={(e) => handleChange({first_name: e.target.value})}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e) => handleChange({last_name: e.target.value})}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => handleChange({email: e.target.value})}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} onChange={(e) => handleChange({password: e.target.value})} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={validateRecaptcha}/>,
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                type="submit"
                onClick={() => {
                  addUser(data);
                }}
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?
                <Link as={ReachLink} to="/login" color={"green.400"}>
                  {" "}
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
