import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { bridge_address } from "@/utils/constants";
import bridge from "@/components/abi/bridge.json";
import { useState, useEffect } from "react";
import { SwapProps } from "@/types";

const useSwap = ({ config }: SwapProps) => {
  const { data, isSuccess, isError, write } = useContractWrite(config);

  return {
    swapData: data,
    isSwapSuccess: isSuccess,
    isSwapError: isError,
    swapWrite: write,
  };
};

export default useSwap;
