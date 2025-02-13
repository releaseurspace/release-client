"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [profileHovered, setProfileHovered] = useState<boolean>(false);

  return (
    <div className="z-50 w-full h-[56px] bg-white flex flex-row justify-between items-center px-5 py-3 shadow-md fixed top-0">
      <div className="flex flex-row items-center">
        <Image
          src="/logo.svg"
          width={104}
          height={44}
          alt="release"
          style={{ width: 104, height: 44 }}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex flex-row gap-8 ml-12 *:font-semibold *:text-base *:select-none *:cursor-pointer">
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
        <button className="text-white text-sm rounded-full font-bold h-9 w-[95px] bg-[#5E3AA1]">
          호스트 모드
        </button>
        <Image
          src={profileHovered ? "/profile-purple.svg" : "/profile-gray.svg"}
          width={40}
          height={40}
          alt="profile"
          style={{ width: 40, height: 40 }}
          className="cursor-pointer"
          onMouseOver={() => setProfileHovered(true)}
          onMouseOut={() => setProfileHovered(false)}
        />
      </div>
    </div>
  );
}
