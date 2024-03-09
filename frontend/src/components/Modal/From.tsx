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
  inputValue?: string;
  onChange?: (value: string) => void;
  inputDisabled?: boolean;
}

export default function From({
  title,
  selected,
  options,
  onSelect,
  menuValue,
  inputValue,
  onChange,
  inputDisabled,
}: FromProps) {
  return (
    <div className="w-full h-[35%] bg-white rounded-3xl shadow-xl flex flex-col justify-between py-12 px-6 gap-4">
      <a className="text-3xl text-gray-700">{title}</a>
      <div className="flex justify-between">
        <Menu options={options} onSelect={onSelect} selected={menuValue} />
        <Input
          token={selected.token}
          value={inputValue}
          onChange={onChange}
          disable={inputDisabled}
        />
      </div>
    </div>
  );
}
