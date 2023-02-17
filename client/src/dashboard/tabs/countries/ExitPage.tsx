import { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

interface Exit {
	name: string,
	description: string,
  type: string,
  heightimpact: number,
  heightlanding: number,
  lat: number, 
  long: number,
  city: string,
	state: string,
  country: string,
  image: string,
  legal: boolean
}

function Exit() {
  const [exit, setExit] = useState<Partial<Exit>>({});

  const exitURL = 'http://localhost:8080/exit';

  useEffect(() => {
    getExit(exitURL);
  }, []);

  // useEffect(() => {
  //   console.log(exit.image);
  // }, [exit]);

  async function getExit(exitsURL: string) {
    try {
      const res = await axios.get(`${exitURL}/${localStorage.name}`);
      setExit(res.data[0]);
    } catch (err: any) {
      if (err) {
        throw err;
      }
    }
  }

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={exit.image}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {exit.name}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {`${exit.city}, ${exit.state}`}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={'lg'}>
                {exit.description}
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Exit Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Height until impact:
                  </Text>{` ${exit.heightimpact} feet`}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Height until landing:
                  </Text>{` ${exit.heightlanding} feet`}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Add to favorites
          </Button>

          <Stack direction='row' alignItems='center' justifyContent={'center'}>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default Exit;
