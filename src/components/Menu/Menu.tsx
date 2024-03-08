import { useState } from "react";
import Image from "next/image";
import ETH from "@/components/assets/ethereum.svg";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export default function Menu() {
  const [selected, setSelected] = useState<string>("ETH");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [{ token: "ETH", address: "0x" }];
  return (
    <div className="w-fit relative h-64">
      <button
        className="bg-orange-950 text-white px-4 rounded-3xl h-12 w-32 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={ETH} alt="ETH" width={30} height={30} />
        <p className="text-lg pl-1">{selected}</p>
        <MdArrowDropDown
          size={20}
          className={`${
            isOpen ? "-rotate-180" : "rotate-0"
          } transition-all duration-500`}
        />
      </button>

      <div
        className={`${
          isOpen ? "h-64 opacity-100" : "h-0 opacity-0"
        }  bg-orange-300 text-white absolute transition-all duration-500 top-[50px] rounded-lg w-32`}
      >
        {options.map((option) => (
          <div key={option.address} className="pl-2">
            <p className="text-lg">{option.token}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
