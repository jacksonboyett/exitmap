import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { Divider, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

type Props = {
  firstLetter: string;
  countryNames: string[];
};

function CountryGroups(props: Partial<Props>) {
  const [countries, setCountries] = useState<string[]>([]);
  const navigate = useNavigate();

  function routeCountry(country: string) {
    // navigate(`/dash/exits/${country}`);
    localStorage.country = country;
    navigate(`/dash/country`);
  }

  useEffect(() => {
    if (props.countryNames !== undefined) setCountries(props.countryNames);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2em', marginLeft: '16px' }}>
        {props.firstLetter}
      </h1>
      <UnorderedList
        mb='12px'
        pb='12px'
        listStyleType='none'
        borderBottom='1px solid black'
        maxWidth={'fit-content'}
      >
        {countries.map((country) => {
          return (
            <ListItem
              key={uniqid()}
              onClick={() => routeCountry(country)}
              _hover={{ textDecoration: 'underline' }}
            >
              {country}
            </ListItem> 
          );
        })}
      </UnorderedList>
    </div>
  );
}

export default CountryGroups;
