"use client";

import Script from "next/script";
import { markerData } from "@/app/types/map";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { reload, zoomIn, zoomOut } from "../lib/custom-map-control";
import {
  firstFocusedMarker,
  firstUnfocusedMarker,
  generalFocusedMarker,
  generalUnfocusedMarker,
  secondFocusedMarker,
  secondUnfocusedMarker,
  thirdFocusedMarker,
  thirdUnfocusedMarker,
} from "../lib/custom-map-marker";
import { threePropertyIds } from "../types/topThreePropertyIds";
// import { seoulGeoJson } from "../lib/seoulGeojson";
// import { guRegionMarkerData } from "../lib/guRegionMarkerData";
// import {
//   focusedGuRegionMarker,
//   unfocusedGuRegionMarker,
// } from "../lib/custom-map-region-marker";

const MAP_ID = "naver-map";

export default function Map({
  threePropertyIds,
  markerData,
  setShowPropertyList,
  focusedPropertyId,
  setFocusedPropertyId,
}: {
  threePropertyIds: threePropertyIds | undefined;
  markerData: markerData[];
  setShowPropertyList: Dispatch<SetStateAction<boolean>>;
  focusedPropertyId: number | null;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const mapRef = useRef<naver.maps.Map | undefined>(undefined);
  const propertyMarkersRef = useRef<naver.maps.Marker[]>([]);
  // const guRegionMarkersRef = useRef<naver.maps.Marker[]>([]);

  //지도 생성, 컨트롤 버튼 생성, 행정구역 폴리곤 생성
  useEffect(() => {
    //지도 생성
    const mapOptions = {
      center: new window.naver.maps.LatLng([126.9782, 37.5626]),
      minZoom: 6,
      zoom: 12,
      scaleControl: true,
      mapDataControl: false,
    };
    const map = new naver.maps.Map(MAP_ID, mapOptions);

    //컨트롤 버튼 생성
    naver.maps.Event.once(map, "init", function () {
      const customControlZoomIn = new naver.maps.CustomControl(zoomIn, {
        position: naver.maps.Position.TOP_RIGHT,
      });
      const customControlZoomOut = new naver.maps.CustomControl(zoomOut, {
        position: naver.maps.Position.TOP_RIGHT,
      });
      const customControlReload = new naver.maps.CustomControl(reload, {
        position: naver.maps.Position.TOP_RIGHT,
      });
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

    // 행정구역 폴리곤 생성
    // naver.maps.Event.once(map, "init", () => {
    //   const newGuRegionMarkers = guRegionMarkerData.map((region, idx) => {
    //     const latlng = new naver.maps.LatLng(region.lat, region.lng);

    //     const marker = new naver.maps.Marker({
    //       position: latlng,
    //       map: mapRef.current,
    //       clickable: true,
    //       icon: {
    //         content: unfocusedGuRegionMarker(region.guName, idx),
    //       },
    //     });

    //     naver.maps.Event.addListener(marker, "click", () => {
    //       console.log("focused!");

    //       marker.setIcon(focusedGuRegionMarker(region.guName, idx));
    //       map.panTo(latlng, { duration: 400 });
    //     });

    //     return marker;
    //   });

    //   guRegionMarkersRef.current = newGuRegionMarkers;

    //   map.data.setStyle(function (feature) {
    //     const styleOptions = {
    //       fillColor: "#ff0000",
    //       fillOpacity: 0.0001,
    //       strokeColor: "#ff0000",
    //       strokeWeight: 2,
    //       strokeOpacity: 0.4,
    //     };

    //     if (feature.getProperty("focus")) {
    //       styleOptions.fillOpacity = 0.6;
    //       styleOptions.fillColor = "#0f0";
    //       styleOptions.strokeColor = "#0f0";
    //       styleOptions.strokeWeight = 4;
    //       styleOptions.strokeOpacity = 1;
    //     }

    //     return styleOptions;
    //   });

    //   const regionGeoJson = seoulGeoJson;

    //   regionGeoJson.forEach(function (geojson) {
    //     map.data.addGeoJson(geojson as naver.maps.GeoJSON, true);
    //   });

    //   map.data.addListener("click", function (e) {
    //     const feature = e.feature;

    //     if (feature.getProperty("focus") !== true) {
    //       feature.setProperty("focus", true);
    //     } else {
    //       feature.setProperty("focus", false);
    //     }
    //   });

    //   // map.data.addListener("mouseover", function (e) {
    //   //   const feature = e.feature,
    //   //     regionName = feature.getProperty("area1");

    //   //   tooltip
    //   //     .css({
    //   //       display: "",
    //   //       left: e.offset.x,
    //   //       top: e.offset.y,
    //   //     })
    //   //     .text(regionName);

    //   //   map.data.overrideStyle(feature, {
    //   //     fillOpacity: 0.6,
    //   //     strokeWeight: 4,
    //   //     strokeOpacity: 1,
    //   //   });
    //   // });

    //   // map.data.addListener("mouseout", function () {
    //   //   tooltip.hide().empty();
    //   //   // map.data.revertStyle();
    //   // });
    // });

    mapRef.current = map;
  }, []);

  //마커 생성
  useEffect(() => {
    if (mapRef.current && markerData.length > 0) {
      propertyMarkersRef.current.forEach((marker) => marker.setMap(null));
      propertyMarkersRef.current = [];

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
          // center: new window.naver.maps.LatLng([
          //   locAverage.lng - 0.015,
          //   locAverage.lat,
          // ]),
        });
        mapRef.current.panTo(
          new window.naver.maps.LatLng([locAverage.lng - 0.015, locAverage.lat])
        );
      } else {
        mapRef.current.setOptions({
          zoom: 13,
          // center: new window.naver.maps.LatLng([
          //   locAverage.lng - 0.06,
          //   locAverage.lat,
          // ]),
        });
        mapRef.current.panTo(
          new window.naver.maps.LatLng([locAverage.lng - 0.06, locAverage.lat])
        );
      }

      const newMarkers = markerData.map((spot) => {
        const latlng = new naver.maps.LatLng(spot.lat, spot.lng);

        let icon;
        if (spot.id === focusedPropertyId) {
          if (spot.id === threePropertyIds?.[1]) {
            icon = firstFocusedMarker;
          } else if (spot.id === threePropertyIds?.[2]) {
            icon = secondFocusedMarker;
          } else if (spot.id === threePropertyIds?.[3]) {
            icon = thirdFocusedMarker;
          } else {
            icon = generalFocusedMarker;
          }
        } else {
          if (spot.id === threePropertyIds?.[1]) {
            icon = firstUnfocusedMarker;
          } else if (spot.id === threePropertyIds?.[2]) {
            icon = secondUnfocusedMarker;
          } else if (spot.id === threePropertyIds?.[3]) {
            icon = thirdUnfocusedMarker;
          } else {
            icon = generalUnfocusedMarker;
          }
        }

        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current,
          clickable: true,
          icon: {
            content: icon,
          },
        });

        naver.maps.Event.addListener(marker, "click", () => {
          setShowPropertyList(true);
          setFocusedPropertyId(spot.id);
        });

        return marker;
      });

      propertyMarkersRef.current = newMarkers;
    }
  }, [
    threePropertyIds,
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
