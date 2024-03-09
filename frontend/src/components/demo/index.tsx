import "@rainbow-me/rainbowkit/styles.css";
import { useContractRead } from "wagmi";
import NFTabi from "@/components/abi/basic.json";
import { Suspense, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

export default function Demo({ number, tokenID }: any) {
  const add = NFTabi.address as `0x${string}`;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [NFTData, setNFTData] = useState({} as any);

  const { data, isError, isLoading } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "tokenURI",
    args: [2],
  });

  // const getNFTs = async (address?: string) => {
  //   setLoading(true);
  //   console.log(data);
  //   try {
  //     const res = await axios.get(
  //       "https://bafybeiambgfilw53az2jo43udnleq76z6er2l56abp6xirgabwt4guqllu.ipfs.dweb.link/6792.json"
  //     );
  //     setImage(res.data.image);
  //     setNFTData(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  return (
    <div className={`flex flex-col items-center justify-between p-24`}>
      <a className="text-black">balance: {number && Number(number)}</a>
      <a className="text-black">tokenID: {tokenID && Number(tokenID)}</a>
      {/* <div>{isLoading ? "s" : data}</div> */}
      <div className="h-[394px] w-[394px]">
        <img
          src="https://ipfs.io/ipfs/Qmdb54hSJvbEUa5V67cRwUFh1VSH47DfGpEoKHLQ7778SL/6792.png"
          alt="NFT"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="text-[32px] text-white">{NFTData.name}</div>
      <div className="text-white">tokenURI: {isLoading ? "" : ""}</div>
      {/* <button
        onClick={() => getNFTs()}
        className="p-10 bg-white text-black rounded-3xl hover:opacity-30 hover:text-white"
      >
        getImage
      </button> */}
    </div>
  );
}
