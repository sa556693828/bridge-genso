import React, { useContext } from "react";
import Desktop from "./FooterDesktop";
import Mobile from "./FooterMobile";

interface Props {
  urlPath?: string;
}

export default function Footer({ urlPath }: Props) {
  const openLink = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <footer className="flex w-full">
      <Desktop />
      <Mobile />
    </footer>
  );
}
