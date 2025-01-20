export type NaverMap = naver.maps.Map;
type Lng = number;
type Lat = number;
export type Coordinates = [Lng, Lat];

export type markerData = {
  id: number;
  lat: Lat;
  lng: Lng;
  monthly_rent: number;
  deposit: number;
};
