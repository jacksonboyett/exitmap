import React, { useState, useEffect, FC } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
  StandaloneSearchBox,
  DirectionsRenderer,
  DirectionsRendererProps,
  DirectionsService,
  useLoadScript,
} from "@react-google-maps/api";
import axios, { AxiosResponse } from "axios";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import { useToast, Spinner, Button, Flex, Box, border } from "@chakra-ui/react";
import { light, dark } from "./MapStyles";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import OnClickIcon from "../../../components/OnClickIcon";
import { mdiDirections } from "@mdi/js";

interface Coordinates {
  lat: number;
  lng: number;
}

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  updateForm?: Function;
  libraries?: Libraries;
}

const Map: FC<MapProps> = (props: MapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: props.libraries,
  });
  const google = window.google;
  interface SearchBox extends google.maps.places.SearchBox {}
  type DirectionsResult = google.maps.DirectionsResult;

  const [icon, setIcon] = useState<any>(null);
  const [searchBox, setSearchBox] = useState<SearchBox>();
  const [directions, setDirections] = useState<DirectionsResult>();

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
  const [addedMarker, setAddedMarker] = useState<Coordinates>();
  const [activeMarker, setActiveMarker] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [center, setCenter] = useState<Coordinates>({ lat: 16, lng: -80 });
  const [zoom, setZoom] = useState<number>(6);
  const navigate = useNavigate();
  const toast = useToast();

  const exitsURL = "http://localhost:8080/exits";

  useEffect(() => {
    getExits(exitsURL);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setCenter({ lat: res.coords.latitude, lng: res.coords.longitude });
        },
        (err) => setZoom(3)
      );
    }
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

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  // });

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

  function getDirections(lat: number, lng: number) {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: new google.maps.LatLng(center.lat, center.lng),
        destination: new google.maps.LatLng(lat, lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  }

  if (isLoaded) {
    return (
      <>
        <StandaloneSearchBox
          onPlacesChanged={() => {
            if (searchBox) {
              const searchResults = searchBox.getPlaces();
              if (searchResults && searchResults.length > 0) {
                const lat = searchResults[0].geometry?.location?.lat();
                const lng = searchResults[0].geometry?.location?.lng();
                if (lat && lng) {
                  setCenter({ lat: lat, lng: lng });
                  setZoom(8);
                }
              }
            }
          }}
          onLoad={(ref) => setSearchBox(ref)}
        >
          <input type="text" />
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={zoom}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onClick={(e) => {
            if (e.latLng) addMarker(e.latLng?.lat(), e.latLng?.lng());
          }}
          options={{ styles: darkMode ? dark : light, backgroundColor: "gray" }}
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
          {directions ? <DirectionsRenderer directions={directions} /> : null}
          {data.map((coord) => {
            return (
              <MarkerF
                key={coord._id}
                position={{ lat: coord.lat, lng: coord.long }}
                onClick={() => handleActiveMarker(coord._id)}
              >
                {activeMarker === coord._id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(0)}>
                    <Flex gap="5px" alignItems="center">
                      <Flex
                        onClick={() => goToExit(coord._id)}
                        className="exit-map-links"
                        direction="column"
                      >
                        <div>{coord.name}</div>
                        <div>{`${coord.heightimpact} ft`}</div>
                      </Flex>
                      <OnClickIcon
                        path={mdiDirections}
                        size={1}
                        onClick={() => getDirections(coord.lat, coord.long)}
                      />
                    </Flex>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            );
          })}
          {addedMarker ? <MarkerF icon={icon} position={addedMarker} /> : null}
        </GoogleMap>
      </>
    );
  } else {
    return <Spinner />;
  }
};

export default Map;
