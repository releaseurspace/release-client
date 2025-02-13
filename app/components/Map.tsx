"use client";

import Script from "next/script";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
import { Property } from "../types/property";
import {
  dongRegionMarkerData,
  guRegionMarkerData,
} from "../lib/seoulRegionMarkerData";
import {
  focusedDongRegionMarker,
  focusedGuRegionMarker,
  unfocusedDongRegionMarker,
  unfocusedGuRegionMarker,
} from "../lib/custom-map-region-marker";
import { defaultStyle, focusedStyle } from "../lib/geojsonFeatureStyle";
import { seoulDongGeoJson, seoulGuGeoJson } from "../lib/seoulGeojson";

const MAP_ID = "naver-map";

export default function Map({
  mainProperties,
  subProperties,
  setShowPropertyList,
  focusedPropertyId,
  setFocusedPropertyId,
}: {
  mainProperties: Property[];
  subProperties: Property[];
  setShowPropertyList: Dispatch<SetStateAction<boolean>>;
  focusedPropertyId: number | null;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const mapRef = useRef<naver.maps.Map | undefined>(undefined);
  const propertyMarkersRef = useRef<naver.maps.Marker[]>([]);
  const guRegionMarkersRef = useRef<naver.maps.Marker[]>([]);
  const dongRegionMarkersRef = useRef<naver.maps.Marker[]>([]);

  const [zoomLevel, setZoomLevel] = useState<number>(12);

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

    naver.maps.Event.addListener(map, "zoom_changed", function (zoom) {
      setZoomLevel(zoom);
    });

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

    mapRef.current = map;
  }, []);

  // 행정구역 폴리곤&마커 생성
  useEffect(() => {
    const map = mapRef.current!;

    naver.maps.Event.once(map, "init", () => {
      //행정구역 구 폴리곤
      const guGeoJson = seoulGuGeoJson;
      guGeoJson.forEach((geojson) => {
        map.data.addGeoJson(geojson as naver.maps.GeoJSON, true);
      });
      const guFeatures = map.data.getAllFeature();

      //행정구역 동 폴리곤
      const dongGeoJson = seoulDongGeoJson;
      map.data.addGeoJson(dongGeoJson as naver.maps.GeoJSON, true);
      const dongFeatures = map.data
        .getAllFeature()
        .slice(25, map.data.getAllFeature().length);

      map.data.setStyle(defaultStyle);

      //행정구역 구 마커
      const newGuRegionMarkers = guRegionMarkerData.map((region, idx) => {
        const latlng = new naver.maps.LatLng(region.lat, region.lng);

        const unfocusedIcon = unfocusedGuRegionMarker(region.guName);
        const focusedIcon = focusedGuRegionMarker(region.guName);

        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current,
          icon: {
            content: unfocusedIcon,
            size: new naver.maps.Size(77.99, 63.99),
            anchor: new naver.maps.Point(0, 0),
          },
          shape: {
            coords: [0, 0, 69, 47],
            type: "rect",
          },
        });

        naver.maps.Event.addListener(marker, "mouseover", () => {
          marker.setIcon({
            content: focusedIcon,
            size: new naver.maps.Size(77.99, 63.99),
            anchor: new naver.maps.Point(0, 0),
          });
          naver.maps.Event.resumeDispatch(marker, "mouseout");

          guFeatures[idx].setStyle(focusedStyle);
        });

        naver.maps.Event.addListener(marker, "mouseout", () => {
          marker.setIcon({
            content: unfocusedIcon,
            size: new naver.maps.Size(77.99, 63.99),
            anchor: new naver.maps.Point(0, 0),
          });

          guFeatures[idx].setStyle(defaultStyle);
        });

        naver.maps.Event.addListener(marker, "click", () => {
          marker.setIcon({
            content: focusedIcon,
          });

          naver.maps.Event.stopDispatch(marker, "mouseout");

          map.panTo(latlng, { duration: 400 });

          guRegionMarkersRef.current.forEach((marker, index) => {
            if (index !== idx) {
              marker.setIcon({
                content: unfocusedGuRegionMarker(
                  guRegionMarkerData[index].guName
                ),
                size: new naver.maps.Size(77.99, 63.99),
                anchor: new naver.maps.Point(0, 0),
              });
            }
          });

          guFeatures.filter((feature, index) => {
            if (index !== idx) {
              feature.setStyle(defaultStyle);
            }
          });
        });

        return marker;
      });

      //행정구역 동 마커
      const newDongRegionMarkers = dongRegionMarkerData.map((region, idx) => {
        const latlng = new naver.maps.LatLng(region.lat, region.lng);

        const unfocusedIcon = unfocusedDongRegionMarker(
          region.guName,
          region.dongName
        );
        const focusedIcon = focusedDongRegionMarker(
          region.guName,
          region.dongName
        );

        const marker = new naver.maps.Marker({
          position: latlng,
          map: mapRef.current,
          icon: {
            content: unfocusedIcon,
            size: new naver.maps.Size(78, 63.99),
          },
          shape: {
            coords: [0, 0, 68, 47],
            type: "rect",
          },
          visible: false,
        });

        naver.maps.Event.addListener(marker, "mouseover", () => {
          marker.setIcon({
            content: focusedIcon,
            size: new naver.maps.Size(78, 63.99),
          });

          naver.maps.Event.resumeDispatch(marker, "mouseout");

          dongFeatures[idx].setStyle(focusedStyle);
        });

        naver.maps.Event.addListener(marker, "mouseout", () => {
          marker.setIcon({
            content: unfocusedIcon,
            size: new naver.maps.Size(78, 63.99),
          });

          dongFeatures[idx].setStyle(defaultStyle);
        });

        naver.maps.Event.addListener(marker, "click", () => {
          marker.setIcon({
            content: focusedIcon,
          });

          naver.maps.Event.stopDispatch(marker, "mouseout");

          map.panTo(latlng, { duration: 400 });

          dongRegionMarkersRef.current.forEach((marker, index) => {
            if (index !== idx) {
              marker.setIcon({
                content: unfocusedDongRegionMarker(
                  dongRegionMarkerData[index].guName,
                  dongRegionMarkerData[index].dongName
                ),
                size: new naver.maps.Size(78, 63.99),
              });
            }
          });

          dongFeatures.filter((feature, index) => {
            if (index !== idx) {
              feature.setStyle(defaultStyle);
            }
          });
        });

        return marker;
      });

      guRegionMarkersRef.current = newGuRegionMarkers;
      dongRegionMarkersRef.current = newDongRegionMarkers;
    });
  }, []);

  // 줌 레벨 & 매물 검색 여부에 따라 행정구역 마커 visible/invisible
  useEffect(() => {
    const features = mapRef.current!.data.getAllFeature();
    features.forEach((feature) => {
      feature.setStyle(defaultStyle);
    });

    const guVisible = zoomLevel >= 11 && zoomLevel <= 13;
    const dongVisible = zoomLevel > 13;
    const allInvisible = mainProperties.length > 0 || subProperties.length > 0;

    if (allInvisible) {
      guRegionMarkersRef.current.forEach((guMarker) => {
        guMarker.setVisible(false);
      });
      dongRegionMarkersRef.current.forEach((dongMarker) => {
        dongMarker.setVisible(false);
      });
    } else {
      guRegionMarkersRef.current.forEach((guMarker, idx) => {
        guMarker.setVisible(guVisible);
        guMarker.setIcon({
          content: unfocusedGuRegionMarker(guRegionMarkerData[idx].guName),
          size: new naver.maps.Size(77.99, 63.99),
          anchor: new naver.maps.Point(0, 0),
        });
      });

      dongRegionMarkersRef.current.forEach((dongMarker, idx) => {
        dongMarker.setVisible(dongVisible);
        dongMarker.setIcon({
          content: unfocusedDongRegionMarker(
            dongRegionMarkerData[idx].guName,
            dongRegionMarkerData[idx].dongName
          ),
          size: new naver.maps.Size(77.99, 63.99),
        });
      });
    }
  }, [zoomLevel, mainProperties, subProperties]);

  //매물 마커 생성
  useEffect(() => {
    if (
      mapRef.current &&
      (mainProperties.length > 0 || subProperties.length > 0)
    ) {
      propertyMarkersRef.current.forEach((marker) => marker.setMap(null));
      propertyMarkersRef.current = [];

      const totalProperties = [...mainProperties, ...subProperties];
      const total = totalProperties.reduce(
        (acc, property) => {
          acc.latSum += +property.latitude;
          acc.lngSum += +property.longitude;
          return acc;
        },
        { latSum: 0, lngSum: 0 }
      );

      const locAverage = {
        lng: total.lngSum / totalProperties.length,
        lat: total.latSum / totalProperties.length,
      };

      if (!focusedPropertyId) {
        mapRef.current.setOptions({
          zoom: 13.5,
        });
        mapRef.current.panTo(
          new window.naver.maps.LatLng([locAverage.lng - 0.015, locAverage.lat])
        );
      } else {
        mapRef.current.setOptions({
          zoom: 13,
        });
        mapRef.current.panTo(
          new window.naver.maps.LatLng([locAverage.lng - 0.06, locAverage.lat])
        );
      }

      const newMainMarkers = mainProperties.map((spot, idx) => {
        const latlng = new naver.maps.LatLng(+spot.latitude, +spot.longitude);

        let icon;
        if (spot.id === focusedPropertyId) {
          if (idx === 0) {
            icon = firstFocusedMarker;
          } else if (idx === 1) {
            icon = secondFocusedMarker;
          } else {
            icon = thirdFocusedMarker;
          }
        } else {
          if (idx === 0) {
            icon = firstUnfocusedMarker;
          } else if (idx === 1) {
            icon = secondUnfocusedMarker;
          } else {
            icon = thirdUnfocusedMarker;
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
          document
            .getElementById("list")
            ?.scrollTo({ top: idx * 129, behavior: "smooth" });
        });

        return marker;
      });

      const newSubMarkers = subProperties.map((spot, idx) => {
        const latlng = new naver.maps.LatLng(+spot.latitude, +spot.longitude);

        const icon =
          spot.id === focusedPropertyId
            ? generalFocusedMarker
            : generalUnfocusedMarker;

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
          document.getElementById("list")?.scrollTo({
            top: (mainProperties.length + idx) * 129,
            behavior: "smooth",
          });
        });

        return marker;
      });

      propertyMarkersRef.current = [...newMainMarkers, ...newSubMarkers];
    }
  }, [
    mainProperties,
    subProperties,
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
