import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Property } from "../types/property";

export default function PropertyDetail({
  property,
  setFocusedPropertyId,
}: {
  property: Property | undefined;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const [selectedTapId, setSelectedTapId] = useState<number>(0);

  return (
    <>
      <div className="w-full h-[51px] border-b-[1px] border-b-[#E9E9F1] bg-white flex justify-between flex-row px-3 sticky top-0">
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

        <div className="w-full h-[106px] py-[17px] pl-[9px]">
          <div className="text-[15px] font-medium text-[#121212] flex flex-row justify-between">
            {property?.purpose}
            <span className="pr-5 text-xs font-medium flex flex-row items-center">
              <Image src="/view.svg" width={20} height={20} alt="views" />
              162
            </span>
          </div>
          <div className="text-[20px] font-bold text-[#5E3AA1] mt-1">
            월세 {property?.deposit}만/
            {property?.monthly_rent}만
          </div>
          <div className="font-bold text-[#121212]">
            권리금 {property?.key_money}만 / 관리비 {property?.maintenance_fee}
            만
          </div>
        </div>

        <div className="w-full h-[48px] flex flex-row *:flex-1 *:text-center *:content-center *:cursor-pointer border-b-[1px] border-b-[#E9E9F1] relative">
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
                  <span className="font-semibold">{property?.deposit}</span>
                </div>
                <div className="font-normal flex justify-between">
                  권리금{" "}
                  <span className="font-semibold">{property?.key_money}</span>
                </div>
                <div className="font-normal flex justify-between">
                  월세{" "}
                  <span className="font-semibold">
                    {property?.monthly_rent}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  관리비{" "}
                  <span className="font-semibold">
                    {property?.maintenance_fee}
                  </span>
                </div>
              </div>

              <div className="gap-4 flex flex-col *:text-[#121212]">
                <div className="px-5 py-4 bg-[#EEEEEE] flex flex-col justify-center">
                  <div className="font-normal flex justify-between">
                    전용 면적{" "}
                    <span className="font-semibold">{property?.deposit}</span>
                  </div>
                  <div className="font-normal flex justify-between">
                    계약 면적{" "}
                    <span className="font-semibold">{property?.key_money}</span>
                  </div>
                  <div className="font-normal flex justify-between">
                    층수{" "}
                    <span className="font-semibold">
                      {property?.monthly_rent}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    주변 지하철 역{" "}
                    <span className="font-semibold">
                      {property?.maintenance_fee}
                    </span>
                  </div>
                  <div className="font-normal flex justify-between">
                    추천 업종{" "}
                    <span className="font-semibold">
                      {property?.maintenance_fee}
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
              <div className="h-[40px] text-[#5E3AA1] bg-[#F1F1FF] flex flex-row items-center justify-center gap-2 cursor-pointer">
                상권 정보 더보기
                <Image
                  src="/arrow-top-right-purple.svg"
                  width={13}
                  height={13}
                  alt="go to Commercial analysis"
                />
              </div>

              <div className="*:text-[#121212] px-5 py-4 flex flex-col justify-center">
                <div className="font-normal flex justify-between">
                  유동인구 <span className="font-semibold">5000명</span>
                </div>
                <div className="font-normal flex justify-between">
                  세대 수 <span className="font-semibold">4천</span>
                </div>
                <div className="font-normal flex justify-between">
                  직장 인구{" "}
                  <span className="font-semibold">
                    {property?.monthly_rent}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  같은 업종{" "}
                  <span className="font-semibold">
                    {property?.maintenance_fee}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  평균 권리금{" "}
                  <span className="font-semibold">
                    {property?.maintenance_fee}
                  </span>
                </div>
                <div className="font-normal flex justify-between">
                  평균 평수{" "}
                  <span className="font-semibold">
                    {property?.maintenance_fee}
                  </span>
                </div>
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
            <>
              <div className="pt-6 px-5">
                <Image
                  src="/example-real-estate-agent.svg"
                  width={315}
                  height={100}
                  alt="agent"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="w-[355px] h-[51px] fixed bottom-0 bg-white border-t-[1px] border-t-[#E9E9F1] flex justify-between items-center px-4">
        <Image src="/btn-like.svg" width={36} height={36} alt="like" />
        <button className="w-[169px] h-[35px] bg-[#5E3AA1] rounded-full text-white font-semibold">
          문의하기
        </button>
      </div>
    </>
  );
}
