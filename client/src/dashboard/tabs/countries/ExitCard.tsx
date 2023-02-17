import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider, Flex } from '@chakra-ui/react'
import React from 'react';

type Props = {
  name: string;
	description: string;
	city: string;
  image: string;
  legal: boolean;
};

function ExitCard(props: Partial<Props>) {

  function legalColor(){
    if (props.legal) {
      return 'green.400'
    } else { 
      return 'red.400'
    }
  }

  const lC = legalColor();

  function legalName() {
    if (props.legal) {
      return 'Legal'
    } else {
      return 'Illegal'
    }
  }

  const lN = legalName();

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
      <Flex justifyContent={'space-between'}>
      <Text color='green.400' fontSize='2xl'>
        {props.city}
      </Text>
      <Button variant={'outline'} height='30px' borderColor={lC} color={lC} pointerEvents={'none'} alignSelf='center'>
        {lN}
      </Button>
      </Flex>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' bg='green.400' color='white'>
        View Exit
      </Button>
      <Button variant='ghost'  color='green.400'>
        Add to favorites
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
	 );
}

export default ExitCard;