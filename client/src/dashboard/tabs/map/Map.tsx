import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import axios, { AxiosResponse } from 'axios';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';

const center = {
  lat: 16,
  lng: -80,
};

function MyComponent() {
  const [data, setData] = useState<any[]>([]);
  const [array, setArray] = useState<any[][]>([]);

  const exitsURL = 'http://localhost:8080/exits';

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

  useEffect(() => {
    let latArray = data.map((exit) => {
      return exit.lat;
    });
    let longArray = data.map((exit) => {
      return exit.long;
    });
    let coordArray = [];
    for (let i = 0; i < latArray.length; i++) {
      coordArray[i] = [latArray[i], longArray[i]];
    }
    setArray(coordArray);
  }, [data]);

  return (
    <LoadScript googleMapsApiKey='AIzaSyAW6WMAp0goyYloDiY4mmurvcLjSo3AmHw'>
      <GoogleMap mapContainerClassName='map-container' center={center} zoom={3}>
        {array.map((coord) => {
          return (
            <MarkerF
              key={uniqid()}
              position={{ lat: coord[0], lng: coord[1] }}
            />
          );
        })}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
