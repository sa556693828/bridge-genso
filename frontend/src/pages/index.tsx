import Menu from "@/components/Menu/Menu";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import ETH from "@/components/assets/ethereum.svg";
import { Option } from "@/types";

export default function Home() {
  const options: Option[] = [{ token: "ETH", address: "0x", image: ETH }];
  const [selected, setSelected] = useState<Option>(options[0]);
  const handleSelect = (option: Option) => {
    setSelected(option);
  };
  return (
    <main
      className="flex flex-col items-center gap-12 p-12 text-black h-full"
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      <div className="flex items-center gap-2">
        <a className="text-3xl">Send</a>
        <Menu onSelect={handleSelect} selected={selected} options={options} />
      </div>
      <Modal selected={selected} />
    </main>
  );
}
