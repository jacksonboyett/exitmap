import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider } from '@chakra-ui/react'

type Props = {
  name: string;
	description: string;
	city: string;
  image: string;
};

function ExitCard(props: Partial<Props>) {
	return ( 
		<Card maxW='sm'>
  <CardBody>
    <Image
      src= {props.image}
      width='max'
      height='250px'
      objectFit='cover'
      alt= {props.name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{props.name}</Heading>
      <Text>
        {props.description}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        {props.city}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        View Exit
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to favorites
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
	 );
}

export default ExitCard;