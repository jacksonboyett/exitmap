import Map from "./map/Map";
import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

function DashHome() {
  const [libraries] = useState<Libraries>(["places"]);
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <Map libraries={libraries} />
    </LoadScript>
  );
}

export default DashHome;
