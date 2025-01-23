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
      <div className="w-full h-[51px] flex justify-between flex-row px-3">
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

      <div>
        <Image
          src="example-property-detail.svg"
          width={355}
          height={245}
          alt="property-detail-photo"
        />
      </div>

      <div className="w-full h-[106px] py-[17px] px-[9px]">
        <div className="">
          <div className="text-[15px] font-medium text-[#121212]">
            {property?.purpose}
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

      <div className="w-full overflow-y-scroll">
        <div className="absolute bg-yellow-500 w-4 h-4">
            <div style={{top: -4, position: "absolute" , backgroundColor: "yellow"}}></div>
        </div>
      </div>

      <div className="w-[355px] h-[48px] fixed bottom-0 border-t-[1px] border-t-[#E9E9F1] flex justify-between items-center px-4">
        <Image src="/btn-like.svg" width={36} height={36} alt="like" />
        <button className="w-[169px] h-[35px] bg-[#5E3AA1] rounded-full text-white font-semibold">
          문의하기
        </button>
      </div>
    </>
  );
}
