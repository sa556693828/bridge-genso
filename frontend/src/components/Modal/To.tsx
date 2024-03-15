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
    <div className="flex h-full w-1/2 flex-col items-center justify-between">
      <div className="h-[45%] w-full bg-white">ss</div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-black/20 active:bg-black/60">
        <FaArrowDown />
      </div>
      <div className="h-[45%] w-full bg-white">ss</div>
    </div>
  );
}
