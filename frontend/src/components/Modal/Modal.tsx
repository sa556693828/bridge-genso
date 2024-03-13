import { useState, useEffect } from "react";
import ETH from "@/components/assets/ethereum.svg";
import matic from "@/components/assets/matic.svg";
import bnb from "@/components/assets/bnbLogo.svg";
import { FaArrowDown } from "react-icons/fa";
import From from "./From";
import { Option } from "@/types";
import { token_address } from "@/utils/constants";
import SendConfig from "../SendConfig/SendConfig";
import { normalizeInput } from "@/helper/normalizeInput";

interface ModalProps {
  selected: Option;
}

export default function Modal({ selected }: ModalProps) {
  const options = [
    { token: "Select Network", chainID: 0, address: "", image: undefined },
    // { token: "Ethereum", chainID: 1, address: "0x", image: ETH },
    // { token: "Binance", chainID: 0, address: "0x", image: bnb },
    // { token: "Polygon", chainID: 0, address: "0x", image: matic },
    { token: "Goerli", chainID: 5, address: token_address(5), image: ETH },
    {
      token: "Mumbai",
      chainID: 80001,
      address: token_address(80001),
      image: matic,
    },
    {
      token: "BscTestnet",
      chainID: 97,
      address: token_address(97),
      image: bnb,
    },
  ];
  const [fromChain, setFromChain] = useState<Option>(options[1]);
  const [toChain, setToChain] = useState<Option>(options[0]);
  const [sendValue, setSendValue] = useState<string | undefined>(undefined);

  const handleFromSelect = (option: Option) => {
    setFromChain(option);
    if (option.token === toChain.token) {
      setToChain(options[0]);
    }
  };
  const handleToSelect = (option: Option) => {
    setToChain(option);
    if (fromChain.token === option.token) {
      setFromChain(options[0]);
    }
  };
  const handleSendValue = (value: string) => {
    const regex = /^[0-9.]*$/;
    const isValidInput = regex.test(value);
    if (!isValidInput) return;
    if (value === "") return setSendValue(undefined);
    const userInput = normalizeInput(value);
    console.log("value", Number(userInput));
    setSendValue(userInput);
  };
  const handleSwitch = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  return (
    <>
      <div className="w-[60%] flex-col items-center flex gap-4">
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
        <div
          className="w-12 h-12 rounded-full flex items-center cursor-pointer justify-center hover:bg-black/20 active:bg-black/60 transition-all"
          onClick={handleSwitch}
        >
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
      <SendConfig from={fromChain} to={toChain} sendValue={Number(sendValue)} />
    </>
  );
}
