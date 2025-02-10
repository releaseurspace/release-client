import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import callAPI from "../util/call-api";
import { PropertyDetails } from "../types/propertyDetail";
import formatPrice from "../util/format-price";

export default function PropertyDetail({
  focusedPropertyId,
  setFocusedPropertyId,
}: {
  focusedPropertyId: number | null;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const [selectedTapId, setSelectedTapId] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetails>();

  useEffect(() => {
    async function getPropertyDetail() {
      if (focusedPropertyId) {
        const res = await (
          await callAPI({
            url:
              process.env.NEXT_PUBLIC_SERVER_URL +
              "/property/" +
              focusedPropertyId,
            method: "GET",
            isPrivate: false,
          })
        ).json();

        setPropertyDetail(res);

        document.getElementById("detail")?.scrollTo({ top: 0 });
        setSelectedTapId(0);
      }
    }
    getPropertyDetail();
  }, [focusedPropertyId]);

  return (
    <>
      <div className="w-full h-[51px] border-b-[1px] border-b-[#E9E9F1] bg-white flex justify-between flex-row px-3 sticky top-0 z-50">
        <Image
          src="/arrow-left.svg"
          width={24}
          height={24}
          alt="close"
          className="cursor-pointer"
          onClick={() => setFocusedPropertyId(null)}
        />
        <Image
          src="/share.svg"
          width={24}
          height={24}
          alt="share"
          className="cursor-pointer"
        />
      </div>

      <div
        id="detail"
        className="w-full h-full overflow-y-auto scrollbar-hide pb-[106px]"
      >
        <div>
          <Image
            src="example-property-detail.svg"
            width={355}
            height={245}
            alt="property-detail-photo"
          />
        </div>

        <div className="w-full py-[12px] px-[13px]">
          <div className="text-[16px] font-bold text-[#121212] flex flex-row justify-between">
            [일반상가] {propertyDetail?.nearest_station} ·{" "}
            {propertyDetail?.purpose}
            <span className="pr-1 text-xs font-medium flex flex-row items-center">
              <Image src="/view.svg" width={20} height={20} alt="views" />
              162
            </span>
          </div>
          <div className="text-[14px] font-normal text-[#121212]">
            {propertyDetail?.description}
          </div>
          <div className="flex flex-row gap-2 mt-3">
            {["#역세권", "#직장인", "#넓은평수"].map((tag, idx) => (
              <div
                key={idx}
                className="text-[#5E3AA1] text-xs font-medium bg-[#F1F1FF] py-1 px-2 rounded-full"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[48px] flex flex-row *:flex-1 *:font-medium *:text-center *:content-center *:cursor-pointer border-b-[1px] border-b-[#E9E9F1] relative">
          <div
            style={{ color: selectedTapId === 0 ? "#121212" : "#6B6B6B" }}
            onClick={() => setSelectedTapId(0)}
          >
            매물정보
          </div>
          <div
            style={{ color: selectedTapId === 1 ? "#121212" : "#6B6B6B" }}
            onClick={() => setSelectedTapId(1)}
          >
            상권정보
          </div>
          <div
            style={{ color: selectedTapId === 2 ? "#121212" : "#6B6B6B" }}
            onClick={() => setSelectedTapId(2)}
          >
            공인중개사
          </div>
          <div
            style={{
              left: `${selectedTapId * 118}px`,
              transition: "left 0.2s ease",
            }}
            className="bg-[#CABBE6] rounded-[4px] w-[118px] h-1 absolute bottom-0"
          ></div>
        </div>

        <div className="w-full">
          {selectedTapId === 0 && propertyDetail ? (
            <>
              <div className="*:text-[#121212] px-5 py-4 flex flex-col justify-center">
                <div className="font-normal flex justify-between">
                  보증금{" "}
                  <span className="font-semibold">
                    {formatPrice(propertyDetail?.deposit)}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  권리금{" "}
                  <span className="font-semibold">
                    {formatPrice(propertyDetail?.key_money)}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  월세{" "}
                  <span className="font-semibold">
                    {formatPrice(propertyDetail?.monthly_rent)}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  관리비{" "}
                  <span className="font-semibold">
                    {formatPrice(propertyDetail?.maintenance_fee)}
                  </span>
                </div>
              </div>

              <div className="gap-4 flex flex-col *:text-[#121212]">
                <div className="px-5 py-4 bg-[#EEEEEE] flex flex-col justify-center">
                  <div className="font-normal flex justify-between">
                    전용 면적{" "}
                    <span className="font-semibold">
                      {propertyDetail?.size +
                        "평 /" +
                        Math.floor(propertyDetail?.size_sqm ?? 0) +
                        "㎡"}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    계약 면적{" "}
                    <span className="font-semibold">
                      {propertyDetail?.size +
                        "평 /" +
                        Math.floor(propertyDetail?.size_sqm ?? 0) +
                        "㎡"}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    층수{" "}
                    <span className="font-semibold">
                      {propertyDetail?.floor} / 총{" "}
                      {propertyDetail?.building_info.replace(/[^0-9]/g, "")} 층
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    주변 지하철 역{" "}
                    <span className="font-semibold">
                      {propertyDetail?.nearest_station +
                        " " +
                        propertyDetail?.distance_to_station}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    추천 업종{" "}
                    <span className="font-semibold">
                      {propertyDetail?.purpose}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-5 py-[10px]">
                  <div className="font-semibold">중개사 코멘트</div>
                  <div className="font-normal text-center px-2">
                    {propertyDetail?.agent_comment}
                  </div>
                </div>
                <div className="space-y-3 px-5 py-[10px]">
                  <div className="font-semibold py-2">세부 정보</div>
                  <div className="flex flex-row *:flex-1 *:flex *:flex-row *:gap-2 gap-2">
                    <div>
                      <Image
                        src="/detail-rental-status.svg"
                        width={40}
                        height={40}
                        alt="rental-status"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">임대 상태</div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.rental_status}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/detail-heating-type.svg"
                        width={40}
                        height={40}
                        alt="heating-type"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">난방</div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.heating_type}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row *:flex-1 *:flex *:flex-row *:gap-2 gap-2">
                    <div>
                      <Image
                        src="/detail-available-date.svg"
                        width={40}
                        height={40}
                        alt="available-date"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">
                          입주 가능일
                        </div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.available_date}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/detail-direction.svg"
                        width={40}
                        height={40}
                        alt="direction"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">방향</div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.direction}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row *:flex-1 *:flex *:flex-row *:gap-2 gap-2">
                    <div>
                      <Image
                        src="/detail-interior.svg"
                        width={40}
                        height={40}
                        alt="interior"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">인테리어</div>
                        <div className="text-[14px] font-semibold">있음</div>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/detail-property-registry.svg"
                        width={40}
                        height={40}
                        alt="property-registry"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">
                          등기부 등본
                        </div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.property_registry}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row *:flex-1 *:flex *:flex-row *:gap-2 gap-2">
                    <div>
                      <Image
                        src="/detail-parking-info.svg"
                        width={40}
                        height={40}
                        alt="parking-info"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">
                          주차 가능 / 총 주차
                        </div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.parking_info}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/detail-bathroom-info.svg"
                        width={40}
                        height={40}
                        alt="bathroom-info"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">화장실</div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.bathroom_info}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row *:flex-1 *:flex *:flex-row *:gap-2 gap-2">
                    <div>
                      <Image
                        src="/detail-elavator-count.svg"
                        width={40}
                        height={40}
                        alt="elavator-count"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">
                          엘리베이터
                        </div>
                        <div className="text-[14px] font-semibold">
                          {propertyDetail?.elevator_count}대
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/detail-window.svg"
                        width={40}
                        height={40}
                        alt="window"
                      />
                      <div className="flex flex-col ">
                        <div className="text-[12px] font-normal">창문</div>
                        <div className="text-[14px] font-semibold">통유리</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 bg-[#EEEEEE] flex flex-col justify-center">
                  <div className="font-normal flex justify-between">
                    건축물 용도{" "}
                    <span className="font-semibold">제 2종 근린생활시설</span>
                  </div>
                  <div className="font-normal flex justify-between">
                    사용 승인일{" "}
                    <span className="font-semibold">1988.10.06</span>
                  </div>
                </div>
              </div>

              <div className="py-4 px-5 flex items-center">
                <div className="font-semibold">로드뷰</div>
              </div>
              <Image
                src="/example-roadview.svg"
                width={355}
                height={185}
                alt="roadview"
              />
            </>
          ) : null}
        </div>

        <div className="w-full">
          {selectedTapId === 1 && propertyDetail ? (
            <>
              <div className="h-[40px] text-[#5E3AA1] text-base font-semibold bg-[#F1F1FF] flex flex-row items-center justify-center gap-2 cursor-pointer">
                상권 정보 더보기
                <Image
                  src="/arrow-top-right-purple.svg"
                  width={13}
                  height={13}
                  alt="go to Commercial analysis"
                />
              </div>

              <div className="*:text-[#121212] px-5 pt-4 flex flex-col justify-center">
                <div className="font-normal flex justify-between">
                  유동인구 <span className="font-semibold">53,842명/ha</span>
                </div>
                <div className="font-normal flex justify-between">
                  주거 인구 <span className="font-semibold">8,205명</span>
                </div>
                <div className="font-normal flex justify-between">
                  직장 인구 <span className="font-semibold">76,930명</span>
                </div>
                <div className="font-normal flex justify-between">
                  동일 업종 점포수 <span className="font-semibold">15개</span>
                </div>
                <div className="font-normal flex justify-between">
                  평균 매출액
                  <span className="font-semibold">1,240만</span>
                </div>
                <div className="font-normal flex justify-between">
                  임대료 시세 (3.3㎡ 당)
                  <span className="font-semibold">165,789원</span>
                </div>
              </div>

              <div className="w-full h-[60px] text-[#505050] text-[12px] font-normal flex items-center justify-center">
                해당 상권 정보는 매물 기준 반경 500m 내 데이터입니다.
              </div>
              <div
                style={{ boxShadow: "0px -1px 4px 0px #D9D9D9" }}
                className="text-base font-semibold text-[#121212] p-[10px]"
              >
                주변 경쟁 업체
              </div>
              <div>
                <Image
                  src="/example-map-photo.svg"
                  width={355}
                  height={185}
                  alt="map"
                  className="cursor-pointer"
                />
              </div>
            </>
          ) : null}
        </div>
        <div className="w-full">
          {selectedTapId === 2 && propertyDetail ? (
            <div className="*:px-5">
              <div className="py-6">
                <Image
                  src="/example-real-estate-agent.svg"
                  width={315}
                  height={100}
                  alt="agent"
                />
              </div>
              <div className="text-base font-semibold text-[#121212]">
                다른 매물 둘러보기
              </div>
              <div className="flex flex-row *:flex-shrink-0 gap-[15px] overflow-x-scroll scrollbar-hide">
                {[1, 1, 1, 1, 1, 1, 1].map((item, idx) => (
                  <div key={idx} className="py-2 text-[#121212]">
                    <Image
                      src="/example-property-thumbnail.svg"
                      width={126}
                      height={126}
                      alt="property thumbnail"
                      className="rounded-xl py-2"
                    />

                    <div className="text-[12px] font-medium">일식집</div>
                    <div className="text-[14px] font-bold ">
                      월세 5000만/ 400만
                    </div>
                    <div className="text-[12px] font-medium">
                      권리금 4천 / 관리비 50만
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-[355px] h-[51px] fixed bottom-0 bg-white border-t-[1px] border-t-[#E9E9F1] flex justify-between items-center px-4">
        <Image
          src={liked ? "/btn-like-clicked.svg" : "/btn-like-unclicked.svg"}
          width={36}
          height={36}
          alt="like"
          className="cursor-pointer transition"
          onClick={() => {
            if (liked) {
              setLiked(false);
              return;
            }
            setLiked(true);
          }}
        />
        <button className="w-[133px] h-[35px] bg-[#885AFF] rounded-full text-white font-semibold cursor-pointer">
          문의하기
        </button>
      </div>
    </>
  );
}
