import React from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Divider, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import ExitCard from "./ExitCard";
import uniqid from "uniqid";
import { useParams } from "react-router-dom";
import Icon from "@mdi/react";

type Props = {
  firstLetter: string;
  countryNames: string[];
};

function Country(props: Partial<Props>) {
  const [exits, setExits] = useState<any[]>([]);

  const exitsURL = "http://localhost:8080/exits";

  let { name } = useParams();

  useEffect(() => {
    getExitsFromCountry(exitsURL);
  }, []);

  async function getExitsFromCountry(exitsURL: string) {
    try {
      const res = await axios.get(`${exitsURL}/${name}`);
      setExits(res.data);
    } catch (err: any) {
      if (err) {
        throw err;
      }
    }
  }

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {exits.map((exit) => {
        return (
          <ExitCard
            key={uniqid()}
            name={exit.name}
            description={exit.description}
            city={exit.city}
            image={exit.image}
            legal={exit.legal}
            id={exit._id}
          />
        );
      })}
    </div>
  );
}

export default Country;
