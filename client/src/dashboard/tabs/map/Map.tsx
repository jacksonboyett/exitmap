import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios, { AxiosResponse } from 'axios';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';

const center = {
  lat: 16,
  lng: -80,
};

export default function MyComponent() {
  const [data, setData] = useState<any[]>([]);
  const [activeMarker, setActiveMarker] = useState(0);
  const navigate = useNavigate();

  const exitsURL = 'http://localhost:8080/exits';

  useEffect(() => {
    getExits(exitsURL);
  }, []);

  useEffect(() => {
    console.log(data)
  }, [data]);

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

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  function goToExit(name: string) {
    localStorage.name = name;
    navigate(`/dash/exit`)
  }

  if (isLoaded) {
    return (
      <GoogleMap mapContainerClassName='map-container' center={center} zoom={3}>
        {data.map((coord) => {
          return (
            <MarkerF
              key={coord._id}
              position={{ lat: coord.lat, lng: coord.long }}
              onClick={() => handleActiveMarker(coord._id)}
            >
              {activeMarker === coord._id ? (
            <InfoWindowF onCloseClick={() => setActiveMarker(0)}>
              <div onClick={() => goToExit(coord.name)} className='exit-map-links' >{coord.name}</div>
            </InfoWindowF>
          ) : null}
            </MarkerF>
          );
        })}
        <></>
      </GoogleMap>
    );
  } else {
    return <div>Loading...</div>;
  }
}