import { useState } from "react";
import Image from "next/image";
import ETH from "@/components/assets/ethereum.svg";
import { MdArrowDropDown } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";

export default function To() {
  const [selected, setSelected] = useState<string>("ETH");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [{ token: "ETH", address: "0x" }];
  return (
    <div className="w-1/2 h-full flex-col items-center flex justify-between">
      <div className="w-full h-[45%] bg-white">ss</div>
      <div className="w-12 h-12 rounded-full flex items-center cursor-pointer justify-center hover:bg-black/20 active:bg-black/60 transition-all">
        <FaArrowDown />
      </div>
      <div className="w-full h-[45%] bg-white">ss</div>
    </div>
  );
}
