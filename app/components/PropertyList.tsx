import { motion } from "framer-motion";
import Image from "next/image";
import { Property } from "../types/property";
import { Dispatch, SetStateAction } from "react";
import PropertyDetail from "./PropertyDetail";
import formatPrice from "../util/format-price";

export default function PropertyList({
  mainProperties,
  subProperties,
  showPropertyList,
  setShowPropertyList,
  focusedPropertyId,
  setFocusedPropertyId,
}: {
  mainProperties: Property[];
  subProperties: Property[];
  showPropertyList: boolean;
  setShowPropertyList: Dispatch<SetStateAction<boolean>>;
  focusedPropertyId: number | null;
  setFocusedPropertyId: Dispatch<SetStateAction<number | null>>;
}) {
  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <motion.div
        className="w-[355px] bg-white h-full fixed top-0 pt-[56px] z-20 flex flex-col"
        initial="hidden"
        animate={
          (mainProperties.length > 0 || subProperties.length > 0) &&
          showPropertyList
            ? "visible"
            : "hidden"
        }
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex flex-col px-5 pt-5 pb-[10px] gap-2">
          <div className="flex flex-row justify-between">
            <div className="font-bold text-lg">
              추천 매물{" "}
              <span className="text-[#9747FF]">
                {mainProperties.length + subProperties.length}
              </span>
            </div>
            <Image
              src="/btn-sidebar.svg"
              width={22}
              height={20}
              alt="close"
              style={{ width: 22, height: 20 }}
              className="cursor-pointer"
              onClick={() => {
                setShowPropertyList(false);
                setFocusedPropertyId(null);
              }}
            />
          </div>
          <div>
            <select
              style={{
                backgroundImage: 'url("/select-triangle.svg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(100% - 10px) center",
                backgroundSize: "10px",
              }}
              className="text-xs text-[#2D125F] bg-[#F1F1FF] border-2 border-[#CABBE6] rounded-full px-[10px] w-[72px] h-[24px] appearance-none cursor-pointer outline-none"
            >
              <option>추천순</option>
              <option>최신순</option>
              <option>가격순</option>
              <option>면적순</option>
            </select>
          </div>
        </div>

        <div
          id="list"
          className="flex flex-col *:border-b-[1px] *:border-b-[#E9E9F1] overflow-y-scroll"
        >
          {mainProperties.map((property, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: "#F1F1FF" }}
              className="h-[129px] w-full flex flex-row py-4 px-5 gap-5 cursor-pointer relative"
              onClick={() => setFocusedPropertyId(property.id)}
            >
              <Image
                src="example-property-thumbnail.svg"
                width={100}
                height={100}
                alt="thumbnail"
                style={{ width: 100, height: 100 }}
              />
              {idx === 0 ? (
                <Image
                  src="/mini-marker-first.svg"
                  width={24}
                  height={28.67}
                  alt="first-recommend"
                  style={{ width: 24, height: 28.67 }}
                  className="absolute top-6 left-7"
                />
              ) : null}
              {idx === 1 ? (
                <Image
                  src="/mini-marker-second.svg"
                  width={24}
                  height={28.67}
                  alt="second-recommend"
                  style={{ width: 24, height: 28.67 }}
                  className="absolute top-6 left-7"
                />
              ) : null}
              {idx === 2 ? (
                <Image
                  src="/mini-marker-third.svg"
                  width={24}
                  height={28.67}
                  alt="third-recommend"
                  style={{ width: 24, height: 28.67 }}
                  className="absolute top-6 left-7"
                />
              ) : null}
              <Image
                src="/btn-heart-outline.svg"
                width={19.6}
                height={19.6}
                alt="heart"
                style={{ width: 19.6, height: 19.6 }}
                className="absolute top-[90px] left-[90px]"
              />
              <div className="w-full space-y-[3px]">
                <div className="space-y-[2px] *:text-[#121212]">
                  <div className="text-xs font-medium">{property.purpose}</div>
                  <div className="text-base font-bold">
                    월세 {formatPrice(property.deposit)}/
                    {formatPrice(property.monthly_rent)}
                  </div>
                  <div className="text-xs font-bold">
                    권리금 {formatPrice(property.key_money)} / 관리비{" "}
                    {formatPrice(property.maintenance_fee)}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="195"
                  height="2"
                  viewBox="0 0 195 2"
                  fill="none"
                >
                  <path
                    d="M1.15625 0.584961H194.156"
                    stroke="#BABABA"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="*:text-xs *:font-medium *:text-[#505050]">
                  <div>
                    {property.size + "평 / "}
                    {property.floor + " / "}
                    {property.nearest_station?.length +
                      property.distance_to_station?.length >
                    10
                      ? (
                          property.nearest_station +
                          property.distance_to_station
                        ).slice(0, 10) + "..."
                      : property.nearest_station +
                        " " +
                        property.distance_to_station}
                  </div>
                  <div>{property.purpose + " 추천"}</div>
                </div>
              </div>
            </div>
          ))}

          {subProperties.map((property, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: "#FFF" }}
              className="h-[129px] w-full flex flex-row py-4 px-5 gap-5 cursor-pointer relative"
              onClick={() => setFocusedPropertyId(property.id)}
            >
              <Image
                src="example-property-thumbnail.svg"
                width={100}
                height={100}
                alt="thumbnail"
                style={{ width: 100, height: 100 }}
              />
              <Image
                src="/btn-heart-outline.svg"
                width={19.6}
                height={19.6}
                alt="heart"
                style={{ width: 19.6, height: 19.6 }}
                className="absolute top-[90px] left-[90px]"
              />
              <div className="w-full space-y-[3px]">
                <div className="space-y-[2px] *:text-[#121212]">
                  <div className="text-xs font-medium">{property.purpose}</div>
                  <div className="text-base font-bold">
                    월세 {formatPrice(property.deposit)}/
                    {formatPrice(property.monthly_rent)}
                  </div>
                  <div className="text-xs font-bold">
                    권리금 {formatPrice(property.key_money)} / 관리비{" "}
                    {formatPrice(property.maintenance_fee)}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="195"
                  height="2"
                  viewBox="0 0 195 2"
                  fill="none"
                >
                  <path
                    d="M1.15625 0.584961H194.156"
                    stroke="#BABABA"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="*:text-xs *:font-medium *:text-[#505050]">
                  <div>
                    {property.size + "평 / "}
                    {property.floor + " / "}
                    {property.nearest_station?.length +
                      property.distance_to_station?.length >
                    10
                      ? (
                          property.nearest_station +
                          property.distance_to_station
                        ).slice(0, 10) + "..."
                      : property.nearest_station +
                        " " +
                        property.distance_to_station}
                  </div>
                  <div>{property.purpose + " 추천"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {focusedPropertyId ? (
        <motion.div
          className="w-[355px] bg-white h-full overflow-y-scroll fixed left-[355px] z-10 scrollbar-hide border-l-[1px] border-l-[#E9E9F1]"
          initial="hidden"
          animate={focusedPropertyId ? "visible" : "hidden"}
          hidden={!focusedPropertyId}
          transition={{ duration: 0.5 }}
          variants={variants}
        >
          <PropertyDetail
            focusedPropertyId={focusedPropertyId}
            setFocusedPropertyId={setFocusedPropertyId}
          />
        </motion.div>
      ) : null}
    </>
  );
}
