import React, { useState } from "react";
import Image from "next/image";

interface Props {
  urlPath?: string;
}

export default function Desktop({ urlPath }: Props) {
  return (
    <div className="hidden w-full flex-col gap-[50px] pb-[130px] pl-[90px] pt-[119px] text-black lg:flex">
      <div className="flex flex-col gap-[18px]"></div>
      <a className="flex text-lg font-bold">
        7007.Studio © All rights reserved.
      </a>
    </div>
  );
}
