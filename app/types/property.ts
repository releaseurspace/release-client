export type Property = {
  id: number;
  latitude: string; // 위도
  longitude: string; // 경도
  purpose: string; // 용도 (ex: 일식집)
  floor: string; // 층수
  size: number; // 전용면적
  description: string; // 설명
  nearest_station: string; // 가까운 역
  distance_to_station: string; // 역까지의 거리
  monthly_rent: number; // 월세
  deposit: number; // 보증금
  key_money: number; // 권리금
  maintenance_fee: number; // 관리비
};