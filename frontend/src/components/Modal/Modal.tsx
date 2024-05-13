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
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { Address, erc20Abi } from "viem";

interface ModalProps {
  selected: Option;
}

export default function Modal({ selected }: ModalProps) {
  const options = [
    {
      token: "Select Network",
      chainID: 0,
      address: "",
      image: undefined,
      scanWeb: "",
    },
    // { token: "Ethereum", chainID: 1, address: "0x", image: ETH },
    // { token: "Binance", chainID: 0, address: "0x", image: bnb },
    // { token: "Polygon", chainID: 0, address: "0x", image: matic },
    {
      token: "Sepolia",
      chainID: 11155111,
      address: token_address(11155111),
      image: ETH,
      scanWeb: "https://sepolia.etherscan.io/",
    },
    {
      token: "Amoy",
      chainID: 80002,
      address: token_address(80002),
      image: matic,
      scanWeb: "https://amoy.polygonscan.com/",
    },
    {
      token: "BscTestnet",
      chainID: 97,
      address: token_address(97),
      image: bnb,
      scanWeb: "https://testnet.bscscan.com/",
    },
  ];
  const [fromChain, setFromChain] = useState<Option>(options[1]);
  const [toChain, setToChain] = useState<Option>(options[0]);
  const [sendValue, setSendValue] = useState<string | undefined>(undefined);
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
    token: token_address(fromChain.chainID) as `0x${string}`,
    chainId: fromChain.chainID,
  });
  const { data: toBalance } = useBalance({
    address: address,
    token: token_address(toChain.chainID) as `0x${string}`,
    chainId: toChain.chainID,
  });

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
    setSendValue(userInput);
  };
  const handleSwitch = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  return (
    <>
      <div className="flex w-[60%] flex-col items-center gap-4">
        <From
          title="From"
          selected={selected}
          options={options}
          onSelect={handleFromSelect}
          menuValue={fromChain}
          inputValue={sendValue}
          onChange={handleSendValue}
          balance={fromChain.chainID === 0 && data ? "" : data?.formatted}
        />
        <div
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-black/20 active:bg-black/60"
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
          balance={
            toChain.chainID === 0 && toBalance ? "" : toBalance?.formatted
          }
        />
      </div>
      <SendConfig
        from={fromChain}
        to={toChain}
        sendValue={sendValue}
        balance={data?.formatted}
      />
    </>
  );
}
