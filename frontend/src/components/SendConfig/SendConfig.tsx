import { useEffect, useState } from "react";
import { Option, SwapProps } from "@/types";
import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { toast } from "react-hot-toast";
import bridge from "@/components/abi/bridge.json";
import token from "@/components/abi/token.json";
import { bridge_address, token_address } from "@/utils/constants";

interface SendProps {
  from: Option;
  to: Option;
  sendValue?: string;
  balance?: string;
  handleReFetch: () => void;
}

export default function SendConfig({
  from,
  to,
  sendValue,
  balance,
  handleReFetch,
}: SendProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [swapIng, setSwapIng] = useState(false);
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [txHash, setTxHash] = useState<string | undefined>("");
  const { address } = useAccount();
  const fromToken = "MV";
  const toToken = "MV";
  const [nonce, setNonce] = useState(() => {
    return parseInt(localStorage.getItem("nonce") || "20000");
  });
  // const { data: toChainBalance } = useBalance({
  //   address: bridge_address(to.chainID) as `0x${string}`,
  //   token: token_address(to.chainID) as `0x${string}`,
  //   chainId: to.chainID,
  // });

  const {
    writeContract: swapWrite,
    data: swapData,
    isSuccess: isSwapSuccess,
    isError: isSwapError,
  } = useWriteContract();
  const swapResult = useWaitForTransactionReceipt({
    hash: swapData,
  });
  console.log("isLoading", isLoading);
  console.log("swapIng", swapIng);
  const handleSend = async () => {
    if (!swapWrite) return;
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
      await switchChain!({ chainId: from.chainID });
      return;
    }
    setIsLoading(true);
    // if (
    //   toChainBalance &&
    //   to.chainID === 80002 &&
    //   Number(sendValue) > Number(toChainBalance.formatted)
    // ) {
    //   return toast.error("Insufficient balance on the destination chain");
    // }

    try {
      setSwapIng(true);
      await swapWrite(
        {
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
        },
        {
          onError(error: any) {
            console.error("Error swaping:", error);
            setSwapIng(false);
          },
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    console.debug("approveResult changed");
    if (!swapResult) return;
    if (swapResult.isSuccess) {
      handleReFetch();
      if (swapData) {
        setTxHash(`${from.scanWeb}/tx/${swapData}`);
        toast.remove();
        toast.success("success");
        setSwapIng(false);
      }
      setSwapIng(false);
    } else if (swapResult.isError) {
      handleReFetch();
      toast.remove();
      toast.error("fail");
      setSwapIng(false);
    }
  }, [
    swapResult.isSuccess,
    swapResult.isError,
    swapResult,
    isSwapError,
    isSwapSuccess,
    swapData,
  ]);

  return (
    <div className="flex h-full w-1/2 flex-col items-start gap-6">
      <div className="flex w-full justify-between">
        <a className="text-xl font-semibold text-gray-600">Fees</a>
        <a className="text-xl font-semibold text-gray-600">0.0001 ETH</a>
      </div>
      <div className="flex w-full justify-between">
        <a className="text-xl font-semibold text-gray-600">
          Estimated Received
        </a>
        <a className="text-xl font-semibold text-gray-600">{sendValue} MV</a>
      </div>
      <div className="flex w-full justify-end">
        {/* <button>Approve</button> */}
        <button
          className="flex w-full items-center justify-center rounded-2xl bg-button px-3 py-3 shadow-2xl hover:shadow active:shadow-lg"
          onClick={handleSend}
          disabled={isLoading || swapIng}
        >
          {isLoading || swapIng ? <span className="loader" /> : "Send"}
        </button>
      </div>
      {txHash && (
        <div className="flex w-full gap-4">
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
