import { useAccount, useContractWrite } from "wagmi";
import { token_address } from "@/utils/constants";
import bridge from "@/components/abi/bridge.json";
import { useState, useEffect } from "react";
import { SwapProps } from "@/types";

const useSwap = ({ fromChainID, value, toChainID }: SwapProps) => {
  const { address } = useAccount();
  const fromToken = "MV";
  const toToken = "MV";
  const [nonce, setNonce] = useState(() => {
    return parseInt(localStorage.getItem("nonce") || "0");
  });

  const { data, isSuccess, isError, write } = useContractWrite({
    address: token_address(fromChainID) as `0x${string}`,
    abi: bridge.abi,
    functionName: "swap",
    args: [address, value, nonce, fromChainID, fromToken, toToken, toChainID],
  });

  // 更新nonce值并存储到LocalStorage中
  const updateNonce = () => {
    setNonce((prevNonce) => {
      const newNonce = prevNonce + 1;
      localStorage.setItem("nonce", newNonce.toString());
      return newNonce;
    });
  };

  // 在交易成功后更新nonce值
  useEffect(() => {
    if (isSuccess) {
      updateNonce();
    }
  }, [isSuccess]);

  return {
    swapData: data,
    isSwapSuccess: isSuccess,
    isSwapError: isError,
    swapWrite: write,
  };
};

export default useSwap;
