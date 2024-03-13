import { useEffect, useState } from "react";
import useSwap from "@/hooks/useSwap";
import { Option, SwapProps } from "@/types";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

interface SendProps {
  from: Option;
  to: Option;
  sendValue: number;
}

export default function SendConfig({ from, to, sendValue }: SendProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { chain } = useNetwork();
  const {
    chains,
    error,
    isLoading: switchLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  const [txHash, setTxHash] = useState<string | undefined>();
  const swapDatas: SwapProps = {
    fromChainID: from.chainID,
    //TODO: 確認浮點數
    value: sendValue * 10000000000000000,
    toChainID: to.chainID,
  };
  const { swapData, isSwapSuccess, isSwapError, swapWrite } =
    useSwap(swapDatas);

  const handleSend = async () => {
    console.log("swapDatas", swapDatas);
    //TODO: switch chain
    if (from.chainID === 0 || to.chainID === 0) return;
    if (sendValue === undefined || sendValue === 0) return;
    //TODO: toast
    setIsLoading(true);
    try {
      await swapWrite();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSwapSuccess) {
      if (swapData) {
        setTxHash(swapData?.hash);
        // toast.closeAll();
        // toast({
        //   title: "Swap Success",
        //   description:"",
        //   status: "success",
        //   duration: 9000,
        //   isClosable: true,
        // });
      }
      setIsLoading(false);
    } else if (isSwapError) {
      // toast.closeAll();
      // toast({
      //   title: "Swap Fail",
      //   status: "error",
      //   duration: 9000,
      //   isClosable: true,
      // });
      setIsLoading(false);
    }
  }, [isSwapError, isSwapSuccess, swapData]);

  return (
    <div className="w-1/2 h-full flex-col items-start flex gap-6">
      <div className="w-full flex justify-between">
        <a className="text-gray-600 font-semibold text-xl">Fees</a>
        <a className="text-gray-600 font-semibold text-xl">0.0001 ETH</a>
      </div>
      <div className="w-full flex justify-between">
        <a className="text-gray-600 font-semibold text-xl">
          Estimated Received
        </a>
        <a className="text-gray-600 font-semibold text-xl">0.0001 MV</a>
      </div>
      <div className="w-full flex justify-end">
        {/* <button>Approve</button> */}
        <button
          className="shadow-2xl w-full px-3 py-3 bg-button rounded-2xl hover:shadow active:shadow-lg"
          onClick={handleSend}
          // onClick={() => console.log("swapWrite", from.address)}
        >
          Send
        </button>
      </div>
      {txHash && (
        <div className="w-full flex justify-between">
          <a className="text-gray-600 font-semibold text-xl">TxHash</a>
          <a className="text-gray-600 font-semibold text-xl">{txHash}</a>
        </div>
      )}
    </div>
  );
}
