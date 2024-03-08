import { useState } from "react";
import { Option } from "@/types";
import Input from "../Input/Input";
import Menu from "../Menu/Menu";

interface FromProps {
  title: string;
  selected: Option;
  options: Option[];
  onSelect: (option: Option) => void;
  menuValue: Option;
}

export default function From({
  title,
  selected,
  options,
  onSelect,
  menuValue,
}: FromProps) {
  return (
    <div className="w-full h-[35%] bg-white rounded-3xl shadow-xl flex flex-col justify-between py-12 px-6 gap-4">
      <a className="text-3xl text-gray-700">{title}</a>
      <div className="flex justify-between">
        <Menu options={options} onSelect={onSelect} selected={menuValue} />
        <div className="flex relative items-center">
          <Input />
          <a className="absolute right-6">{selected.token}</a>
        </div>
      </div>
    </div>
  );
}
