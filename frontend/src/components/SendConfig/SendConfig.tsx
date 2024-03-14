import { useEffect, useState } from "react";
import useSwap from "@/hooks/useSwap";
import { Option, SwapProps } from "@/types";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";
import { toast } from "react-hot-toast";
import bridge from "@/components/abi/bridge.json";
import { bridge_address } from "@/utils/constants";

interface SendProps {
  from: Option;
  to: Option;
  sendValue?: string;
  balance?: string;
}

export default function SendConfig({
  from,
  to,
  sendValue,
  balance,
}: SendProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [txHash, setTxHash] = useState<string | undefined>("");
  const { address } = useAccount();
  const fromToken = "MV";
  const toToken = "MV";
  const [nonce, setNonce] = useState(() => {
    return parseInt(localStorage.getItem("nonce") || "0");
  });

  const { config } = usePrepareContractWrite({
    address: bridge_address(from.chainID) as `0x${string}`,
    abi: bridge.abi,
    functionName: "swap",
    args: [
      address,
      Number(sendValue) * 1000000000000000000,
      nonce,
      from.chainID,
      fromToken,
      toToken,
      to.chainID,
    ],
  });
  const {
    data: swapData,
    isSuccess: isSwapSuccess,
    isError: isSwapError,
    write: swapWrite,
  } = useContractWrite(config);

  const handleSend = async () => {
    if (from.chainID === 0 || to.chainID === 0) {
      return toast.error("Please select the network");
    }
    if (sendValue === undefined || sendValue === "0") {
      return toast.error("Please input the amount");
    }
    if (balance && Number(sendValue) > Number(balance)) {
      return toast.error("Insufficient balance");
    }
    if (from.chainID !== chain?.id) {
      await switchNetwork!(from.chainID);
      return;
    }

    //TODO: toast
    setIsLoading(true);
    try {
      await swapWrite?.();
    } catch (error) {
      console.log(error);
    }
  };

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
    if (isSwapSuccess) {
      updateNonce();
    }
  }, [isSwapSuccess]);
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
