import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { RxCross2, RxDownload } from "react-icons/rx";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Props {
  urlPath: string;
  openLink: (link: string) => void;
}

export default function Mobile({ openLink }: Props) {
  const [showMenu, setShowMenu] = useState(false);
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
      <div className="fixed z-50 w-full px-5 pt-5 md:hidden">
        <div
          className={`flex w-full items-center justify-between self-stretch`}
        ></div>
      </div>
      <div className="fixed bottom-[50px] right-5 z-50 flex w-full justify-end md:hidden">
        <div className="z-50 flex flex-col gap-[18px] text-right">
          <div
            className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full border pt-[2px] delay-100 duration-[1200ms] ${
              isVisible ? "opacity-100" : "scale-50 opacity-0"
            } ${
              hoverTG ? "border-buttonGr shadow-buttonG" : "border-white"
            } bg-black transition-all`}
            onMouseEnter={() => setHoverTG(true)}
            onMouseLeave={() => setHoverTG(false)}
          >
            <FaTelegramPlane size={23} color={hoverTG ? "#B4FF78" : "white"} />
          </div>
          <div
            className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full delay-100 duration-[1200ms] ${
              isVisible ? "opacity-100" : "scale-50 opacity-0"
            } ${
              hoverX
                ? "bg-buttonGr shadow-buttonG"
                : "border border-white bg-white"
            } transition-all`}
            onMouseEnter={() => setHoverX(true)}
            onMouseLeave={() => setHoverX(false)}
          >
            <FaXTwitter size={25} color="black" />
          </div>
        </div>
      </div>
    </>
  );
}
