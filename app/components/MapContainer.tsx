"use client";

import { useEffect, useState } from "react";
import { Coordinates, markerData } from "@/app/types/map";
import Map from "./Map";

export default function MapContainer({
  markerData,
}: {
  markerData: markerData[];
}) {
  const [loc, setLoc] = useState<Coordinates>();

  const initLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoc([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {  //eslint-disable-line
        setLoc([126.9783882, 37.5666103]);
      }
    );
  };

  useEffect(() => {
    initLocation();
  }, []);

  return loc && <Map loc={loc} markerData={markerData} />;
}
