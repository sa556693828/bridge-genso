import React, { useState } from "react";
import Image from "next/image";

interface Props {
  urlPath?: string;
}

export default function Desktop({ urlPath }: Props) {
  return (
    <div className="hidden w-full justify-center items-center text-black lg:flex">
      <a className="flex text-xs font-bold">
        Bridge-Genso © All rights reserved.
      </a>
    </div>
  );
}
