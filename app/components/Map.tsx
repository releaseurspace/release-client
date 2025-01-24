"use client";

import Script from "next/script";
import { markerData } from "@/app/types/map";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { guGeojson } from "../lib/seoulGeojson";
import { focusedMarker, generalMarker } from "../lib/custom-map-marker";
import { reload, zoomIn, zoomOut } from "../lib/custom-map-control";

const MAP_ID = "naver-map";

export default function Map({
  markerData,
  setShowPropertyList,
  focusedPropertyId,
  setFocusedPropertyId,
}: {
  markerData: markerData[];
  setShowPropertyList: Dispatch<SetStateAction<boolean>>;
  focusedPropertyId: number | null;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const mapRef = useRef<naver.maps.Map | undefined>(undefined);
  const markersRef = useRef<naver.maps.Marker[]>([]);

  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng([126.9882, 37.5412]),
      minZoom: 6,
      zoom: 12,
      scaleControl: true,
      mapDataControl: false,
    };
    const map = new naver.maps.Map(MAP_ID, mapOptions);

    const customControlZoomIn = new naver.maps.CustomControl(zoomIn, {
      position: naver.maps.Position.TOP_RIGHT,
    });

    const customControlZoomOut = new naver.maps.CustomControl(zoomOut, {
      position: naver.maps.Position.TOP_RIGHT,
    });

    const customControlReload = new naver.maps.CustomControl(reload, {
      position: naver.maps.Position.TOP_RIGHT,
    });

    naver.maps.Event.once(map, "init", function () {
      customControlZoomIn.setMap(map);
      customControlZoomOut.setMap(map);
      customControlReload.setMap(mapRef.current);

      naver.maps.Event.addDOMListener(
        customControlZoomIn.getElement(),
        "click",
        function () {
          const currentZoomLevel = map.getZoom();
          map.setZoom(currentZoomLevel + 2, true);
        }
      );

      naver.maps.Event.addDOMListener(
        customControlZoomOut.getElement(),
        "click",
        function () {
          const currentZoomLevel = map.getZoom();
          map.setZoom(currentZoomLevel - 2, true);
        }
      );
    });

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

      map.data.addListener("mouseout", function () {
        tooltip.hide().empty();
        // map.data.revertStyle();
      });
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (mapRef.current && markerData.length > 0) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const total = markerData.reduce(
        (acc, marker) => {
          acc.latSum += marker.lat;
          acc.lngSum += marker.lng;
          return acc;
        },
        { latSum: 0, lngSum: 0 }
      );

      const locAverage = {
        lng: total.lngSum / markerData.length,
        lat: total.latSum / markerData.length,
      };

      if (!focusedPropertyId) {
        mapRef.current.setOptions({
          zoom: 13.5,
          center: new window.naver.maps.LatLng([
            locAverage.lng - 0.015,
            locAverage.lat,
          ]),
        });
      } else {
        mapRef.current.setOptions({
          zoom: 13,
          center: new window.naver.maps.LatLng([
            locAverage.lng - 0.06,
            locAverage.lat,
          ]),
        });
      }

      const newMarkers = markerData.map((spot) => {
        const latlng = new naver.maps.LatLng(spot.lat, spot.lng);
        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current,
          clickable: true,
          icon: {
            content:
              spot.id === focusedPropertyId ? focusedMarker : generalMarker,
          },
        });

        naver.maps.Event.addListener(marker, "click", () => {
          setShowPropertyList(true);
          setFocusedPropertyId(spot.id);
          mapRef.current?.setCenter(
            new naver.maps.LatLng(spot.lat, spot.lng - 0.03)
          );
        });

        return marker;
      });

      markersRef.current = newMarkers;
    }
  }, [
    markerData,
    focusedPropertyId,
    setShowPropertyList,
    setFocusedPropertyId,
  ]);

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
