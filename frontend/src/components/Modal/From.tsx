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
  balance?: string;
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
  balance,
}: FromProps) {
  const truncatedNumber =
    balance === "" ? 0 : Math.floor(Number(balance) * 1e5) / 1e5;
  return (
    <div className="flex h-[35%] w-full flex-col justify-between gap-4 rounded-3xl bg-white px-6 py-12 shadow-xl">
      <div className="flex w-full justify-between">
        <a className="text-3xl text-gray-700">{title}</a>
        <a
          className="cursor-pointer text-xl text-gray-500 transition-all hover:text-black"
          onClick={balance && onChange ? () => onChange(balance) : () => {}}
        >
          Balance : {truncatedNumber}
        </a>
      </div>
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
