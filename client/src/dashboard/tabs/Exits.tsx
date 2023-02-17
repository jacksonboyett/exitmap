import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Divider, Flex } from "@chakra-ui/react";
import CountryGroup from "./countries/CountryGroups";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Routes, Route } from "react-router-dom";
import uniqid from "uniqid";

const axiosRequest = require("axios");

interface Props {
  firstLetter: string;
  countryName: string;
}

function Exits() {
  const [data, setData] = useState<any[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);

  const exitsURL = "http://localhost:8080/exits";

  useEffect(() => {
    getExits(exitsURL);
  }, []);

  async function getExits(url: string) {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err: any) {
      if (err) {
        throw err;
      }
    }
  }

  // LOOK UP CUSTOM HOOKS

  useEffect(() => {
    let countriesArray = data.map((exit) => {
      return exit.country;
    });
    countriesArray = removeDuplicates(countriesArray);
    setCountries(countriesArray.sort());
    getFirstLetter(countriesArray);
  }, [data]);

  function getFirstLetter(array: Array<string>) {
    let letterArray: Array<string> = [];
    array.forEach((country) => letterArray.push(country.charAt(0)));
    letterArray = removeDuplicates(letterArray);
    setLetters(letterArray.sort());
  }

  function removeDuplicates(array: Array<string>) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  // Array of array of country names, use index in map

  return (
    <Routes>
      <Route
        path=""
        element={
          <div style={{ display: "grid" }}>
            {letters.map((letter) => {
              return (
                <CountryGroup
                  key={uniqid()}
                  firstLetter={letter}
                  countryNames={(function () {
                    let array: Array<string> = [];
                    countries.forEach((country) => {
                      if (country.charAt(0) === letter) {
                        array.push(country);
                      }
                    });
                    return array;
                  })()}
                />
              );
            })}
          </div>
        }
      />
    </Routes>
  );
}

// NAME IT COUNTRYGROUP

export default Exits;

// Get first letter of countries to group them
//
