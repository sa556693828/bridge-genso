import React, { useContext, useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import Image from "next/image";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Props {
  urlPath: string;
  openLink: (link: string) => void;
}

export default function Desktop({ urlPath, openLink }: Props) {
  const router = useRouter();
  const [hoverTG, setHoverTG] = useState(false);
  const [hoverX, setHoverX] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 2000);
  }, []);

  return (
    <>
      <div className="z-50 h-[60px] hidden items-center justify-between md:flex px-12">
        {/* <ConnectButton /> */}
        <div></div>
        <ConnectButton />
      </div>
    </>
  );
}
