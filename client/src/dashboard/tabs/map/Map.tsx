import React, { useState, useEffect, FC } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
  OverlayView,
  GroundOverlay,
  Circle,
  DrawingManager,
  TransitLayer,
  MarkerProps,
} from "@react-google-maps/api";
import axios, { AxiosResponse } from "axios";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import { useToast, Spinner, Button, Flex } from "@chakra-ui/react";
import { light, dark } from "./MapStyles";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

const center = {
  lat: 16,
  lng: -80,
};

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  updateForm?: Function;
}

interface AddedMarker {
  lat: number;
  lng: number;
}
//test
const Map: FC<MapProps> = (props: MapProps) => {
  const [icon, setIcon] = useState<any>(null);

  const google = window.google;
  useEffect(() => {
    if (google != undefined) {
      setIcon({
        path: faMapPin.icon[4] as string,
        fillColor: "#ff173e",
        fillOpacity: 1,
        scale: 0.08,
        anchor: new google.maps.Point(
          faMapPin.icon[0] / 2, // width
          faMapPin.icon[1] // height
        ),
      });
    }
  }, [google]);

  const [data, setData] = useState<any[]>([]);
  const [addedMarker, setAddedMarker] = useState<AddedMarker>();
  const [activeMarker, setActiveMarker] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

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

  function addMarker(lat: number, lng: number) {
    setAddedMarker({ lat: lat, lng: lng });
    if (props.updateForm) props.updateForm(lat, lng);
  }

  let clickHoldTimer: any;

  const handleMouseDown = (e: any) => {
    clickHoldTimer = setTimeout(() => {
      showCoord(e);
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
        onClick={(e) =>
          e.latLng ? addMarker(e.latLng?.lat(), e.latLng?.lng()) : null
        }
        options={{ styles: darkMode ? dark : light }}
      >
        <Button
          m="10px"
          position="relative"
          left="165px"
          borderRadius="3px"
          bg={darkMode ? "black" : "white"}
          color={darkMode ? "#d3a96f" : "gray"}
          boxShadow="-1px 0px 2px rgba(0,0,0,0.07)"
          _hover={{ bg: darkMode ? "rgb(40,40,40)" : "rgb(240,240,240)" }}
          onClick={() => setDarkMode(!darkMode)}
        >
          Dark Mode
        </Button>
        {data.map((coord) => {
          return (
            <MarkerF
              key={coord._id}
              position={{ lat: coord.lat, lng: coord.long }}
              onClick={() => handleActiveMarker(coord._id)}
            >
              {activeMarker === coord._id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(0)}>
                  <Flex
                    onClick={() => goToExit(coord._id)}
                    className="exit-map-links"
                    alignItems="center"
                    direction="column"
                  >
                    <div>{coord.name}</div>
                    <div>{`${coord.heightimpact} ft`}</div>
                  </Flex>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          );
        })}
        {addedMarker ? <MarkerF icon={icon} position={addedMarker} /> : null}
      </GoogleMap>
    );
  } else {
    return <Spinner />;
  }
};

export default Map;
