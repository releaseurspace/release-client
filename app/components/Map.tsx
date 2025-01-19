"use client";

import Script from "next/script";
import { Coordinates, NaverMap } from "@/app/types/map";
import { useEffect, useRef } from "react";

const MAP_ID = "naver-map";

export default function Map({ loc }: { loc: Coordinates }) {
  const mapRef = useRef<NaverMap | null>(null);

  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(loc),
      minZoom: 6,
      zoom: 15,
      scaleControl: true,
      mapDataControl: true,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    };

    mapRef.current = new naver.maps.Map(MAP_ID, mapOptions);
  }, [loc]);

  // const initializeMap = useCallback(() => {
  //   const mapOptions = {
  //     center: new window.naver.maps.LatLng(loc),
  //     minZoom: 6,
  //     zoom: 15,
  //     scaleControl: true,
  //     mapDataControl: true,
  //     logoControl: true,
  //     logoControlOptions: {
  //       position: naver.maps.Position.BOTTOM_LEFT,
  //     },
  //     zoomControl: true,
  //     zoomControlOptions: {
  //       position: naver.maps.Position.TOP_RIGHT,
  //       style: naver.maps.ZoomControlStyle.SMALL,
  //     },
  //   };
  //   const map = new window.naver.maps.Map(MAP_ID, mapOptions);
  //   mapRef.current = map;

  //   // const clusterMarkers = [
  //   //   {
  //   //     content:
  //   //       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background-size:contain;"></div>',
  //   //     size: new naver.maps.Size(40, 40),
  //   //     anchor: new naver.maps.Point(20, 20),
  //   //   },
  //   //   {
  //   //     content:
  //   //       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background-size:contain;"></div>',
  //   //     size: new naver.maps.Size(40, 40),
  //   //     anchor: new naver.maps.Point(20, 20),
  //   //   },
  //   //   {
  //   //     content:
  //   //       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background-size:contain;"></div>',
  //   //     size: new naver.maps.Size(40, 40),
  //   //     anchor: new naver.maps.Point(20, 20),
  //   //   },
  //   //   {
  //   //     content:
  //   //       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background-size:contain;"></div>',
  //   //     size: new naver.maps.Size(40, 40),
  //   //     anchor: new naver.maps.Point(20, 20),
  //   //   },
  //   //   {
  //   //     content:
  //   //       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background-size:contain;"></div>',
  //   //     size: new naver.maps.Size(40, 40),
  //   //     anchor: new naver.maps.Point(20, 20),
  //   //   },
  //   // ];

  //   const markers = [] as naver.maps.Marker[];

  //   function onLoad() {
  //     const data = [
  //       { grd_la: 37.2253017, grd_lo: 127.1460516 },
  //       { grd_la: 37.4253017, grd_lo: 127.2460516 },
  //       { grd_la: 37.5253017, grd_lo: 127.3460516 },
  //       { grd_la: 37.6253017, grd_lo: 127.4460516 },
  //       { grd_la: 37.3253017, grd_lo: 127.5460516 },
  //       { grd_la: 37.1253017, grd_lo: 127.6460516 },
  //     ];

  //     data.map((spot) => {
  //       const latlng = new naver.maps.LatLng(spot.grd_la, spot.grd_lo);
  //       const marker = new naver.maps.Marker({
  //         position: latlng,
  //         map: map,
  //       });

  //       markers.push(marker);
  //     });

  //     // const markerClustering = new MarkerClustering({
  //     //   minClusterSize: 2,
  //     //   maxZoom: 8,
  //     //   map: map,
  //     //   markers: markers,
  //     //   disableClickZoom: false,
  //     //   gridSize: 120,
  //     //   icons: clusterMarkers,
  //     //   indexGenerator: [10, 100, 200, 500, 1000],
  //     //   stylingFunction: function (clusterMarker, count) {
  //     //     $(clusterMarker.getElement()).find("div:first-child").text(count);
  //     //   },
  //     // });
  //   }

  //   onLoad();
  // }, [loc]);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        // onReady={initializeMap}
      ></Script>
      <div id={MAP_ID} style={{ width: "100%", height: "100%" }} />
    </>
  );
}
