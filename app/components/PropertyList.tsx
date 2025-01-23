import { motion } from "framer-motion";
import Image from "next/image";
import { Property } from "../types/property";
import { Dispatch, SetStateAction } from "react";

export default function PropertyList({
  properties,
  showPropertyList,
  setShowPropertyList,
}: {
  properties: Property[];
  showPropertyList: boolean;
  setShowPropertyList: Dispatch<SetStateAction<boolean>>;
}) {
  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  //   const [showPropertyDetail, setShowPropertyDetail] = useState<boolean>(true);

  return (
    <>
      <motion.div
        className="w-[355px] bg-white h-full overflow-y-scroll fixed z-20"
        initial="hidden"
        animate={
          properties.length > 0 && showPropertyList ? "visible" : "hidden"
        }
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex flex-col px-5 pt-5 pb-[10px] gap-2">
          <div className="flex flex-row justify-between">
            <div className="font-bold text-lg">
              추천 매물{" "}
              <span className="text-[#9747FF]">{properties.length}</span>
            </div>
            <Image
              src="/btn-sidebar.svg"
              width={22}
              height={20}
              alt="close"
              className="cursor-pointer"
              onClick={() => setShowPropertyList(false)}
            />
          </div>
          <div>
            <select
              style={{
                backgroundImage: 'url("/select-triangle.svg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(100% - 10px) center",
                backgroundSize: "12px",
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

        <div className="flex flex-col scrollbar-hide *:border-b-[1px] *:border-b-[#E9E9F1]">
          {properties.map((property, idx) => (
            <div
              key={idx}
              className="h-[129px] w-full flex flex-row py-4 px-5 gap-5"
              //   onClick={() => setShowPropertyDetail(true)}
            >
              <Image
                src="example-property-photo.svg"
                width={98}
                height={98}
                alt="thumbnail"
              />
              <div className="w-full space-y-1">
                <div className="space-y-[2px]">
                  <div className="text-xs text-[#121212]">
                    {property.purpose}
                  </div>
                  <div className="text-base font-bold text-[#5E3AA1]">
                    월세 {property.deposit}만/
                    {property.monthly_rent}만
                  </div>
                  <div className="text-xs font-bold text-[#121212]">
                    권리금 {property.key_money}만 / 관리비{" "}
                    {property.maintenance_fee}만
                  </div>
                </div>
                <div className="space-y-[1px]">
                  <hr />
                  <div className="text-xs text-[#6B6B6B]">
                    {Math.floor(property.size / 3.3)}평 / {property.floor} /{" "}
                    {property.nearest_station} {property.distance_to_station}
                  </div>
                  <div className="text-xs text-[#6B6B6B]">
                    {property.description.length > 20
                      ? property.description.slice(0, 20) + "..."
                      : property.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      {/* <motion.div
        className="min-w-[400px] bg-white h-full overflow-y-scroll fixed left-[400px] z-10"
        initial="hidden"
        animate={
          properties.length > 0 && showPropertyList ? "visible" : "hidden"
        }
        transition={{ duration: 0.5 }}
        variants={variants}
      ></motion.div> */}
    </>
  );
}
