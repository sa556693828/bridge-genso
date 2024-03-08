import React from "react";
import Image from "next/image";

interface Props {
  urlPath?: string;
}

export default function Mobile({ urlPath }: Props) {
  return (
    <div className="flex w-full flex-col gap-[60px] px-[40px] pb-[146px] pt-[90px] text-black lg:hidden">
      <a className="flex text-xs font-bold">
        7007.Studio © All rights reserved.
      </a>
    </div>
  );
}
