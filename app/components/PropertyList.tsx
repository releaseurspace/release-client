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

  return (
    <motion.div
      className="min-w-[400px] bg-white h-full overflow-y-scroll fixed z-10"
      initial="hidden"
      animate={properties.length > 0 && showPropertyList ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <div className="flex flex-col p-8 gap-2">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-lg">
            추천 매물{" "}
            <span className="text-[#9747FF]">{properties.length}</span>
          </div>
          <Image
            src="/btn-x.svg"
            width={14}
            height={14}
            alt="close"
            onClick={() => setShowPropertyList(false)}
          />
        </div>
        <div>
          <select className="bg-[#F2F2F7] border-[1px] border-[#DADAE5] rounded-full px-1">
            <option>추천순</option>
            <option>최신순</option>
            <option>가격순</option>
            <option>면적순</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        {properties.map((property, idx) => (
          <div
            key={idx}
            className="h-[164px] w-full flex flex-row py-4 px-4 gap-6"
          >
            <Image
              src="example-property-photo.svg"
              width={120}
              height={120}
              alt="thumbnail"
            />
            <div className="py-3 space-y-1">
              <div className="text-xs text-[#2D125F]">{property.purpose}</div>
              <div className="text-xl font-bold text-[#9747FF]">
                월세 {property.deposit}만/
                {property.monthly_rent}만
              </div>
              <div className="text-xs font-bold text-[#2D125F]">
                권리금 {property.key_money}만 / 관리비{" "}
                {property.maintenance_fee}만
              </div>
              <hr />
              <div className="text-xs text-[#645B75]">
                {Math.floor(property.size / 3.3)}평 / {property.floor} /{" "}
                {property.nearest_station} {property.distance_to_station}
              </div>
              <div className="text-xs text-[#645B75]">
                {property.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
