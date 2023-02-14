import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { Divider, Flex } from '@chakra-ui/react'

type Props= {
  firstLetter: string;
  countryName: string;
}

function Country(props: Partial<Props>) {
  return (
		<div>
			<h1 style={{ fontSize: '2em', marginLeft: '16px'}}>A</h1>
    <UnorderedList mb='12px' pb='12px' listStyleType='none' borderBottom='1px solid black' maxWidth={'fit-content'}>
      <ListItem>Albania</ListItem>
      <ListItem>America</ListItem>
      <ListItem>Austria</ListItem>
      <ListItem>Azerbijan</ListItem>
    </UnorderedList>
		</div>
  );
}

export default Country;
