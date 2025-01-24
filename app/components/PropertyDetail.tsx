import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import callAPI from "../util/call-api";
import { PropertyDetails } from "../types/propertyDetail";

export default function PropertyDetail({
  focusedPropertyId,
  setFocusedPropertyId,
}: {
  focusedPropertyId: number | null;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const [selectedTapId, setSelectedTapId] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetails | null>(
    null
  );

  useEffect(() => {
    async function getPropertyDetail() {
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

      <div className="w-full overflow-y-scroll pb-[106px]">
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
            [일반상가] {propertyDetail?.nearest_station} · {propertyDetail?.purpose}
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
          {selectedTapId === 0 ? (
            <>
              <div className="*:text-[#121212] px-5 py-4 flex flex-col justify-center">
                <div className="font-normal flex justify-between">
                  보증금{" "}
                  <span className="font-semibold">{propertyDetail?.deposit}</span>
                </div>
                <div className="font-normal flex justify-between">
                  권리금{" "}
                  <span className="font-semibold">{propertyDetail?.key_money}</span>
                </div>
                <div className="font-normal flex justify-between">
                  월세{" "}
                  <span className="font-semibold">
                    {propertyDetail?.monthly_rent}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  관리비{" "}
                  <span className="font-semibold">
                    {propertyDetail?.maintenance_fee}
                  </span>
                </div>
              </div>

              <div className="gap-4 flex flex-col *:text-[#121212]">
                <div className="px-5 py-4 bg-[#EEEEEE] flex flex-col justify-center">
                  <div className="font-normal flex justify-between">
                    전용 면적{" "}
                    <span className="font-semibold">{propertyDetail?.deposit}</span>
                  </div>
                  <div className="font-normal flex justify-between">
                    계약 면적{" "}
                    <span className="font-semibold">{propertyDetail?.key_money}</span>
                  </div>
                  <div className="font-normal flex justify-between">
                    층수{" "}
                    <span className="font-semibold">
                      {propertyDetail?.monthly_rent}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    주변 지하철 역{" "}
                    <span className="font-semibold">
                      {propertyDetail?.maintenance_fee}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    추천 업종{" "}
                    <span className="font-semibold">
                      {propertyDetail?.maintenance_fee}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-5 py-[10px]">
                  <div className="font-semibold">AI 코멘트</div>
                  <div className="font-normal text-center">
                    오마카세 창업에 적합한 입지와
                    <br /> 분위기를 지니고 있어요!
                    <br /> 이전 업종도 일식집이라
                    <br /> 인테리어는 걱정 없어도 되어요!
                  </div>
                </div>
                <div className="space-y-3 px-5 py-[10px]">
                  <div className="font-semibold">세부 정보</div>
                  <div className="font-normal text-center">
                    <Image
                      src="/example-details.svg"
                      width={289}
                      height={296}
                      alt="details"
                    />
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
          {selectedTapId === 1 ? (
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
                  유동인구 <span className="font-semibold">5000명</span>
                </div>
                <div className="font-normal flex justify-between">
                  세대 수 <span className="font-semibold">4천</span>
                </div>
                <div className="font-normal flex justify-between">
                  직장 인구{" "}
                  <span className="font-semibold">
                    {propertyDetail?.monthly_rent}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  같은 업종{" "}
                  <span className="font-semibold">
                    {propertyDetail?.maintenance_fee}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  평균 권리금{" "}
                  <span className="font-semibold">
                    {propertyDetail?.maintenance_fee}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  평균 평수{" "}
                  <span className="font-semibold">
                    {propertyDetail?.maintenance_fee}
                  </span>
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
                />
              </div>
            </>
          ) : null}
        </div>
        <div className="w-full">
          {selectedTapId === 2 ? (
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
                  <div key={idx} className="py-2 text-[#121212] w-[115px]">
                    <Image
                      src="/example-property-thumbnail.svg"
                      width={115}
                      height={115}
                      alt="property thumbnail"
                      className="rounded-xl"
                    />
                    <div className="text-[6px] font-medium">일식집</div>
                    <div className="text-xs font-bold ">월세 5000만/ 400만</div>
                    <div className="text-[8px] font-bold">
                      권리금 4천 / 관리비 50만
                    </div>
                    <hr />
                    <div className="text-[#505050] text-[6px] font-medium">
                      34평 / 5층 / 학동역 도보 5분
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
