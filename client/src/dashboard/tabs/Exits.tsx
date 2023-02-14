import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { Divider, Flex } from '@chakra-ui/react'
import Country from './countries/Country';
import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';

interface Props {
	firstLetter: string,
	countryName: string,
}

function Exits() {
	const [data, setData] = useState<AxiosResponse | null>(null)

	const exitsURL = "http://localhost:8080/exits";

	useEffect(() => {
		getExits(exitsURL);
	}, []);

	async function getExits(url: string) {
		try {
			const res = await axios.get(url)
			setData(res.data);
		} catch (err: any) {
			if (err) {
				throw err;
			}
		}
	}

	function log(res: any) {
		console.log(res)
	}


  return (
		<div style={{ display: 'grid'}}>
		<Country />
		<Country />
		</div>
  );
}

export default Exits;
