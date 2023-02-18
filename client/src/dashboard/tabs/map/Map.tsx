import React, { useState, useEffect, FC } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios, { AxiosResponse } from "axios";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const center = {
  lat: 16,
  lng: -80,
};

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {}

const Map: FC<MapProps> = ({}) => {
  const [data, setData] = useState<any[]>([]);
  const [activeMarker, setActiveMarker] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const exitsURL = "http://localhost:8080/exits";

  useEffect(() => {
    getExits(exitsURL);
  }, []);

  useEffect(() => {
    console.log(data);
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
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  function goToExit(id: number) {
    navigate(`/dash/exit/${id}`);
  }

  function showCoord(event: any) {
    toast({
      title: "These are the coordinates!",
      description: `${event.latLng.lat()} , ${event.latLng.lng()} `,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  let clickHoldTimer: any;

  const handleMouseDown = (e: any) => {
    clickHoldTimer = setTimeout(() => {
      showCoord(e)
    }, 1000); //Change 1000 to number of milliseconds required for mouse hold
  };

  const handleMouseUp = () => {
    clearTimeout(clickHoldTimer);
  };

  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={3}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
      >
        {data.map((coord) => {
          return (
            <MarkerF
              key={coord._id}
              position={{ lat: coord.lat, lng: coord.long }}
              onClick={() => handleActiveMarker(coord._id)}
            >
              {activeMarker === coord._id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(0)}>
                  <div
                    onClick={() => goToExit(coord._id)}
                    className="exit-map-links"
                  >
                    {coord.name}
                  </div>
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

export default Map;
