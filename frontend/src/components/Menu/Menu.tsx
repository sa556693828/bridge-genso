import { useState } from "react";
import Image from "next/image";
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
        className="bg-[#c7dfe9] text-stone-700 px-4 rounded-3xl h-12 w-fit flex items-center justify-between"
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
          isOpen
            ? "h-fit opacity-100 cursor-pointer"
            : "h-0 opacity-0 pointer-events-none"
        } absolute shadow-2xl bg-white transition-all top-[50px] rounded-lg z-50 min-w-44 py-2`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="w-full flex gap-[10px] hover:bg-purple-400 items-center transition-all duration-500 h-12 px-5"
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
          >
            {option.image && (
              <Image src={option.image} alt="token" width={30} height={30} />
            )}
            <p className="text-lg">{option.token}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
