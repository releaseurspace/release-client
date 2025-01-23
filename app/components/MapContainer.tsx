"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Coordinates, markerData } from "@/app/types/map";
import Map from "./Map";

export default function MapContainer({
  markerData,
  focusedPropertyId,
  setShowPropertyList,
  setFocusedPropertyId,
}: {
  markerData: markerData[];
  focusedPropertyId: number | null;
  setShowPropertyList: Dispatch<SetStateAction<boolean>>;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const [loc, setLoc] = useState<Coordinates>();

  const initLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoc([position.coords.longitude, position.coords.latitude]);
      },
      (error) => { //eslint-disable-line
        setLoc([126.9783882, 37.5666103]);
      }
    );
  };

  useEffect(() => {
    initLocation();
  }, []);

  return (
    loc && (
      <Map
        loc={loc}
        markerData={markerData}
        focusedPropertyId={focusedPropertyId}
        setShowPropertyList={setShowPropertyList}
        setFocusedPropertyId={setFocusedPropertyId}
      />
    )
  );
}
