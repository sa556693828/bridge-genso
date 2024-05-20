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
    <div className="relative w-fit">
      <button
        className="flex h-12 w-fit items-center justify-between rounded-3xl bg-[#c7dfe9] px-4 text-stone-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.image && (
          <Image src={selected.image} alt="token" width={30} height={30} />
        )}
        <p className="px-2 text-lg">{selected.token}</p>
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
            ? "h-fit cursor-pointer opacity-100"
            : "pointer-events-none h-0 opacity-0"
        } absolute top-[50px] z-50 min-w-52 rounded-lg bg-white py-2 shadow-2xl transition-all`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex h-12 w-full items-center gap-[10px] px-5 transition-all duration-500 hover:bg-purple-400"
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
