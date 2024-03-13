import { useState } from "react";

interface Props {
  token: string;
  value?: string;
  onChange?: (value: string) => void;
  disable?: boolean;
}

export default function Input({ token, value, onChange, disable }: Props) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <div
      className={`flex relative items-center ${
        disable
          ? "pointer-events-none cursor-pointer opacity-50"
          : "opacity-100"
      }`}
    >
      <input
        type="text"
        className={`w-full h-12 rounded-xl px-4 shadow-inner2xl outline-none`}
        placeholder="0"
        value={value ? value : inputValue}
        disabled={disable}
        onChange={
          onChange
            ? (e) => onChange(e.target.value)
            : (e) => handleChange(e.target.value)
        }
      />
      <a className="absolute right-6 bg-white font-bold pl-2">{token}</a>
    </div>
  );
}
