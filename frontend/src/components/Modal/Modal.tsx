import { useState } from "react";
import Image from "next/image";
import ETH from "@/components/assets/ethereum.svg";
import { MdArrowDropDown } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import From from "./From";
import { Option } from "@/types";

interface ModalProps {
  selected: Option;
}

export default function Modal({ selected }: ModalProps) {
  const options = [
    { token: "Select Network", address: "", image: undefined },
    { token: "Ethereum", address: "0x", image: ETH },
    { token: "Binance", address: "0x", image: ETH },
    { token: "Polygon", address: "0x", image: ETH },
    { token: "PolygonMumbai", address: "0x", image: ETH },
    { token: "EthereumGoerli", address: "0x", image: ETH },
  ];
  const [fromChain, setFromChain] = useState<Option>(options[1]);
  const [toChain, setToChain] = useState<Option>(options[0]);
  const [sendValue, setSendValue] = useState<string>("0");

  const handleFromSelect = (option: Option) => {
    setFromChain(option);
  };
  const handleToSelect = (option: Option) => {
    setToChain(option);
  };
  const handleSendValue = (value: string) => {
    setSendValue(value);
  };
  return (
    <div className="w-1/2 h-full flex-col items-center flex gap-4">
      {/* <button onClick={() => console.log("sendValue", sendValue)}>
        asdasdasdas
      </button> */}
      <From
        title="From"
        selected={selected}
        options={options}
        onSelect={handleFromSelect}
        menuValue={fromChain}
        inputValue={sendValue}
        onChange={handleSendValue}
      />
      <div className="w-12 h-12 rounded-full flex items-center cursor-pointer justify-center hover:bg-black/20 active:bg-black/60 transition-all">
        <FaArrowDown />
      </div>
      <From
        title="To (estimated)"
        selected={selected}
        options={options}
        onSelect={handleToSelect}
        menuValue={toChain}
        inputValue={sendValue}
        inputDisabled={true}
      />
    </div>
  );
}
