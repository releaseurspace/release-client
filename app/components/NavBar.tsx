"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="w-full h-[78px] bg-white flex flex-row justify-between items-center px-10 py-3 shadow-md fixed top-0">
      <div className="flex flex-row items-center">
        <Image
          src="/logo.svg"
          width={152}
          height={54}
          alt="release"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex flex-row gap-8 ml-12 *:font-semibold *:text-sm *:select-none *:cursor-pointer">
          <div
            className={`${pathname === "/property" ? "text-[#9747FF]" : ""}`}
            onClick={() => router.push("/property")}
          >
            매물 탐색
          </div>
          <div
            className={`${pathname === "/report" ? "text-[#9747FF]" : ""}`}
            onClick={() => router.push("/report")}
          >
            내 보고서
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button className="bg-[#2D125F] text-white rounded-xl font-bold text-base px-2 h-10 w-[113px]">
          호스트 모드
        </button>
        <Image src="/profile.svg" width={40} height={40} alt="profile" />
      </div>
    </div>
  );
}
