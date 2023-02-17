import { useState, useEffect, useRef } from "react";
import axios from "axios";
import uniqid from "uniqid";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Input,
  Textarea,
  Grid,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { format } from "date-fns";

interface Exit {
  _id: number;
  name: string;
  description: string;
  type: string;
  heightimpact: number;
  heightlanding: number;
  lat: number;
  long: number;
  city: string;
  state: string;
  country: string;
  image: string;
  legal: boolean;
}

interface Comment {
  created_at?: string;
  first_name?: string;
  last_name?: string;
  text?: string;
}

function Exit() {
  const [exit, setExit] = useState<Partial<Exit>>({});
  const [comments, setComments] = useState<Comment[]>([{}]); // how to do this without making interface optional
  const [commentInput, setCommentInput] = useState("");

  const exitURL = "http://localhost:8080/exit";

  useEffect(() => {
    getExit(exitURL);
    getComments(exitURL);
  }, []);

  // useEffect(() => {
  //   console.log(exit);
  // }, [exit]);

  async function getExit(exitURL: string) {
    try {
      const res = await axios.get(`${exitURL}/${localStorage.name}`);
      setExit(res.data[0]);
    } catch (err: any) {
      if (err) {
        console.log(err);
      }
    }
  }

  async function getComments(exitURL: string) {
    try {
      const res = await axios.get(`${exitURL}s/${localStorage.name}/comments`);
      setComments(res.data);
    } catch (err: any) {
      if (err) {
        console.log(err);
      }
    }
  }

  function legalColor() {
    if (exit.legal) {
      return "green.400";
    } else {
      return "red.400";
    }
  }
  const lC = legalColor();
  function legalName() {
    if (exit.legal) {
      return "Legal";
    } else {
      return "Illegal";
    }
  }
  const lN = legalName();

  async function addComment() {
    const user_id = localStorage.getItem("user_id");
    const url = `${exitURL}s/${exit._id}/comments`;
    try {
      const res = await axios.post(url, {
        headers: {
          text: commentInput,
          user_id: user_id,
          exit_id: exit._id,
        },
      });
      getComments(exitURL);
    } catch (err) {
      console.log(err);
    }
    setCommentInput("");
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 5 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={exit.image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {exit.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {`${exit.city}, ${exit.state}`}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{exit.description}</Text>
            </VStack>

            <Flex justifyContent="space-between">
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Exit Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Height until impact:
                    </Text>
                    {` ${exit.heightimpact} feet`}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Height until landing:
                    </Text>
                    {` ${exit.heightlanding} feet`}
                  </ListItem>
                </List>
              </Box>
              <Button
                variant={"outline"}
                height="30px"
                borderColor={lC}
                color={lC}
                pointerEvents={"none"}
                alignSelf="center"
              >
                {lN}
              </Button>
            </Flex>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
          ></Stack>
        </Stack>
      </SimpleGrid>
      <Grid gridTemplateColumns="1fr 1fr" gap="2em">
        <Flex direction="column" bg="white" borderRadius="5px">
          {comments.map((comment) => {
            return (
              <Flex
                key={uniqid()}
                borderBottom="1px solid black"
                p="1em"
                direction="column"
                gap="2em"
              >
                <Box>{comment.text}</Box>

                <Flex justifyContent="space-between" alignItems="end">
                  <Text fontSize="0.9em">{`${comment.first_name} ${comment.last_name}`}</Text>
                  <Text color="gray.500">
                    {comment.created_at
                      ? format(new Date(comment.created_at), "MMM do, y p")
                      : null}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex direction="column" gap="20px">
          <Textarea
            bgColor="white"
            resize="none"
            value={commentInput}
            placeholder="Add a comment"
            onChange={(e: any) => setCommentInput(e.target.value)}
          />
          <Button
            colorScheme="green"
            maxW="max-content"
            alignSelf="center"
            onClick={() => {
              addComment();
            }}
          >
            Submit
          </Button>
        </Flex>
      </Grid>
    </Container>
  );
}

export default Exit;
