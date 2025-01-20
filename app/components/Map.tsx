"use client";

import Script from "next/script";
import { Coordinates, markerData, NaverMap } from "@/app/types/map";
import { useEffect, useRef } from "react";
import CustomMapMarker from "../util/custom-map-marker";
import formatMapPrice from "../util/format-price";

const MAP_ID = "naver-map";

export default function Map({
  loc,
  markerData,
}: {
  loc: Coordinates;
  markerData: markerData[];
}) {
  const mapRef = useRef<NaverMap | undefined>(undefined);

  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(loc),
      minZoom: 6,
      zoom: 15,
      scaleControl: true,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    };
    const map = new naver.maps.Map(MAP_ID, mapOptions);
    mapRef.current = map;
  }, [loc]);

  const markersRef = useRef<naver.maps.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && markerData.length > 0) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const total = markerData.reduce(
        (acc, marker) => {
          acc.latSum += marker.lat;
          acc.lngSum += marker.lng - 0.015;
          return acc;
        },
        { latSum: 0, lngSum: 0 }
      );

      const locAverage = [
        total.lngSum / markerData.length,
        total.latSum / markerData.length,
      ] as Coordinates;

      mapRef.current.setOptions({
        zoom: 13.5,
        center: new window.naver.maps.LatLng(locAverage),
      });

      const newMarkers = markerData.map((spot) => {
        const monthly_rent = formatMapPrice(spot.monthly_rent);
        const deposit = formatMapPrice(spot.deposit);

        const latlng = new naver.maps.LatLng(spot.lat, spot.lng);
        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current,
          clickable: true,
          icon: {
            content: CustomMapMarker({ monthly_rent, deposit }),
          },
        });

        return marker;
      });

      markersRef.current = newMarkers;
    }
  }, [markerData]);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      ></Script>
      <div id={MAP_ID} className="w-full h-full" />
    </>
  );
}
