"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div className="w-full h-16 flex flex-row justify-between items-center px-4 shadow-md">
        <div className="flex flex-row items-center">
          <Image
            src="/logo.svg"
            width={126}
            height={47}
            alt="release"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="flex flex-row gap-8 ml-12 *:font-semibold *:text-sm *:select-none *:cursor-pointer *:text-[#2D125F]">
            <div>매물</div>
            <div>상권분석</div>
            <div>내 보고서</div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 ">
          <button className="text-[#2D125F] border-[1px] border-[#2D125F] rounded-full font-semibold text-sm px-2 h-8 w-28">
            호스트 모드
          </button>
          <Image src="/profile.svg" width={40} height={40} alt="profile" />
        </div>
      </div>

      <div className="flex flex-row h-full w-full">
        <div className="w-full h-full">map</div>
        <div className="w-96 h-full flex flex-col">
          <div className="h-full">
            <Image src="/logo-ai.svg" width={54} height={54} alt="ai" />
          </div>
          <div className="h-20 bg-yellow-200"></div>
        </div>
      </div>
    </div>
  );
}
