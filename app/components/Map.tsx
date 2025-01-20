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
  const mapRef = useRef<NaverMap | null>(null);

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

  useEffect(() => {
    if (markerData.length > 0) {
      const markers = [] as naver.maps.Marker[];

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

      mapRef.current?.setOptions({
        zoom: 13.5,
        center: new window.naver.maps.LatLng(locAverage),
      });

      markerData.map((spot) => {
        const monthly_rent = formatMapPrice(spot.monthly_rent);
        const deposit = formatMapPrice(spot.deposit);

        const latlng = new naver.maps.LatLng(spot.lat, spot.lng);
        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current!,
          clickable: true,
          icon: {
            //html element를 반환하는 CustomMapMarker 컴포넌트 할당
            content: CustomMapMarker({ monthly_rent, deposit }),
            // 마커의 크기 지정
            // size: new naver.maps.Size(38, 58),
            // //마커의 기준위치 지정
            // anchor: new naver.maps.Point(19, 58),
          },
        });

        markers.push(marker);
      });
    }
  }, [markerData]);

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
      <div id={MAP_ID} className="w-full h-full" />
    </>
  );
}
