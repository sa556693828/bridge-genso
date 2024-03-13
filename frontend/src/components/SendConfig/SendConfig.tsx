import { useEffect, useState } from "react";
import useSwap from "@/hooks/useSwap";
import { Option, SwapProps } from "@/types";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { toast } from "react-hot-toast";

interface SendProps {
  from: Option;
  to: Option;
  sendValue?: string;
}

export default function SendConfig({ from, to, sendValue }: SendProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [txHash, setTxHash] = useState<string | undefined>("");
  const swapDatas: SwapProps = {
    fromChainID: from.chainID,
    //TODO: 確認浮點數
    value: Number(sendValue) * 10000000000000000,
    toChainID: to.chainID,
  };
  const { swapData, isSwapSuccess, isSwapError, swapWrite } =
    useSwap(swapDatas);

  const handleSend = async () => {
    console.log("swapDatas", swapDatas);
    // const loadingToast = toast.loading("Sending...");
    if (from.chainID === 0 || to.chainID === 0) return;
    if (sendValue === undefined || sendValue === "0") return;
    if (from.chainID !== chain?.id) {
      console.log("switching chain");
      await switchNetwork!(from.chainID);
      return;
    }
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
        setTxHash(`${from.scanWeb}tx/${swapData?.hash}`);
        toast.remove();
        toast.success("success");
      }
      setIsLoading(false);
    } else if (isSwapError) {
      toast.remove();
      toast.error("fail");
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
          className="shadow-2xl w-full px-3 py-3 bg-button flex justify-center items-center rounded-2xl hover:shadow active:shadow-lg"
          onClick={handleSend}
        >
          {isLoading ? <span className="loader" /> : "Send"}
        </button>
      </div>
      {txHash && (
        <div className="w-full flex gap-4">
          <a className="font-bold">txHash:</a>
          <a
            href={`${txHash}`}
            target="_blank"
            className="underline underline-offset-4"
          >
            <strong>
              {txHash?.substring(0, 35)}. . .
              {txHash?.substring(txHash.length - 3, txHash.length)}
            </strong>
          </a>
        </div>
      )}
    </div>
  );
}
