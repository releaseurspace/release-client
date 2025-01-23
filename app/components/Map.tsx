"use client";

import Script from "next/script";
import { Coordinates, markerData, NaverMap } from "@/app/types/map";
import { useEffect, useRef } from "react";
import CustomMapMarker from "../lib/custom-map-marker";
import { guGeojson } from "../lib/seoulGeojson";

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

    naver.maps.Event.once(map, "init", () => {
      const regionGeoJson = JSON.parse(guGeojson);
      console.log(regionGeoJson);

      const tooltip = $(
        '<div style="position:absolute;z-index:1000;padding:5px 10px;background-color:#fff;border:solid 2px #000;font-size:14px;pointer-events:none;display:none;"></div>'
      );

      tooltip.appendTo(map.getPanes().floatPane);

      map.data.setStyle(function (feature) {
        const styleOptions = {
          fillColor: "#ff0000",
          fillOpacity: 0.0001,
          strokeColor: "#ff0000",
          strokeWeight: 2,
          strokeOpacity: 0.4,
        };

        if (feature.getProperty("focus")) {
          styleOptions.fillOpacity = 0.6;
          styleOptions.fillColor = "#0f0";
          styleOptions.strokeColor = "#0f0";
          styleOptions.strokeWeight = 4;
          styleOptions.strokeOpacity = 1;
        }

        return styleOptions;
      });

      // regionGeoJson.forEach(function (geojson) {
      //   map.data.addGeoJson(geojson, false);
      // });
      map.data.addGeoJson(regionGeoJson, true);

      map.data.addListener("click", function (e) {
        const feature = e.feature;

        if (feature.getProperty("focus") !== true) {
          feature.setProperty("focus", true);
        } else {
          feature.setProperty("focus", false);
        }
      });

      map.data.addListener("mouseover", function (e) {
        const feature = e.feature,
          regionName = feature.getProperty("area1");

        tooltip
          .css({
            display: "",
            left: e.offset.x,
            top: e.offset.y,
          })
          .text(regionName);

        map.data.overrideStyle(feature, {
          fillOpacity: 0.6,
          strokeWeight: 4,
          strokeOpacity: 1,
        });
      });

      map.data.addListener("mouseout", function (e) {  //eslint-disable-line
        tooltip.hide().empty();
        // map.data.revertStyle();
      });
    });
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
        const latlng = new naver.maps.LatLng(spot.lat, spot.lng);
        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current,
          clickable: true,
          icon: {
            content: CustomMapMarker({ id: spot.id }),
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
