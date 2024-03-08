import { useState } from "react";
import Image from "next/image";
import ETH from "@/components/assets/ethereum.svg";
import { MdArrowDropDown } from "react-icons/md";
import { Option } from "@/types";

interface MenuProps {
  options: Option[];
  selected: Option;
  onSelect: (option: Option) => void;
}

export default function Menu({ options, onSelect, selected }: MenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-fit relative">
      <button
        className="bg-orange-950 text-white px-4 rounded-3xl h-12 w-fit flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.image && (
          <Image src={selected.image} alt="token" width={30} height={30} />
        )}
        <p className="text-lg px-2">{selected.token}</p>
        <MdArrowDropDown
          size={20}
          className={`${
            isOpen ? "-rotate-180" : "rotate-0"
          } transition-all duration-500`}
        />
      </button>

      <div
        className={`${
          isOpen ? "h-fit opacity-100" : "h-0 opacity-0"
        }  bg-orange-300 text-white absolute transition-all duration-500 top-[50px] rounded-lg w-fit min-w-32 px-2 cursor-pointer`}
      >
        {options.map((option, index) => (
          <div key={index} className="pl-2" onClick={() => onSelect(option)}>
            <p className="text-lg">{option.token}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
