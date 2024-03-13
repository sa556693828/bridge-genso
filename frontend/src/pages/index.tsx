import { useState } from "react";
import Menu from "@/components/Menu/Menu";
import Modal from "@/components/Modal/Modal";
import MV from "@/components/assets/token.jpeg";
import { Option } from "@/types";
import Footer from "@/components/Footer/Footer";
import { useAccount } from "wagmi";

export default function Home() {
  const options: Option[] = [
    { token: "MV", chainID: 0, address: "0x", image: MV.src, scanWeb: "" },
  ];
  const [selected, setSelected] = useState<Option>(options[0]);
  const handleSelect = (option: Option) => {
    setSelected(option);
  };
  return (
    <main
      className="flex flex-col items-center gap-10 p-12 text-black h-full"
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      <div className="flex items-center gap-2">
        <a className="text-3xl">Send</a>
        <Menu onSelect={handleSelect} selected={selected} options={options} />
      </div>
      <Modal selected={selected} />
      <Footer />
    </main>
  );
}
