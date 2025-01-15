"use client";

import MapContainer from "@/app/components/MapContainer";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";

export default function Home() {

  return (
    <div className="h-[100vh]">
      <NavBar />

      <div className="flex flex-row h-full w-full pt-[78px]">
        <div className="w-full h-full">
          <MapContainer />
        </div>

        <div className="w-[540px] h-full flex flex-col p-4 border-l-2">
          <div className="h-full flex flex-col justify-center items-center gap-4">
            <Image src="/logo-ai.svg" width={54} height={54} alt="ai chatbot" />
            <div className="font-bold text-2xl text-[#2D125F]">
              Release 매물 비서
            </div>
            <div className="shadow-md rounded-[32px] p-[10px] text-center text-base font-semibold text-[#645B75] w-[416px] h-[109px] items-center">
              안녕하세요! 🏢
              <br />
              원하는 상업용 매물을 찾아주는 릴리스 AI 비서입니다!
              <br />
              생각하고 계신 지역이나 예산, 조건 등을 말씀해주세요
            </div>
          </div>
          <div className="gap-1 flex flex-col">
            <div className="relative">
              <textarea
                placeholder="릴리스 AI 비서에게 물어보기"
                className="bg-[#EFEFEF] w-full h-auto max-h-14 rounded-full outline-none pl-6 pr-12 py-4 resize-none overflow-hidden"
              ></textarea>
              <Image
                src="/btn-textarea-submit.svg"
                width={40}
                height={40}
                alt="submit"
                className="absolute top-2 right-2 cursor-pointer"
              />
            </div>

            <div className="text-xs text-[#645B75] text-center">
              릴리스 비서는 실수를 할 수 있습니다. 원하는 매물 정보를 정확히
              입력하세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
