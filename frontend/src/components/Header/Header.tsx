import React, { useContext } from "react";
import Desktop from "./HeaderDesktop";
import Mobile from "./HeaderMobile";

interface Props {
  urlPath: string;
}

export default function Header({ urlPath }: Props) {
  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <header className="z-50 h-full w-full overflow-hidden text-black transition-all dark:text-white">
      <Desktop urlPath={urlPath} openLink={openLink} />
      <Mobile urlPath={urlPath} openLink={openLink} />
    </header>
  );
}
