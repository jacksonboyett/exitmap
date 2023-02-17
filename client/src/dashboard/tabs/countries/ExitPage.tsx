import { useState, useEffect } from 'react';
import axios from 'axios';

function Exit() {
	const [exit, setExit] = useState<any[]>([]);

  const exitURL = 'http://localhost:8080/exit';

  useEffect(() => {
    getExit(exitURL);
  }, []);

	useEffect(() => {
		console.log(exit)
	}, [exit]);

  async function getExit(exitsURL: string) {
    try {
      const res = await axios.get(`${exitsURL}/${localStorage.name}`);
      setExit(res.data);
      // console.log(res.data[0].name)
    } catch (err: any) {
      if (err) {
        throw err;
      }
    }
  }

	return ( <div>{localStorage.name}</div> );
}

export default Exit;