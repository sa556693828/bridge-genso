import { useState } from "react";

export default function Input() {
  const [selected, setSelected] = useState<string>("ETH");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="">
      <input
        type="text"
        className="w-full h-12 rounded-3xl border-2 border-black/20 px-4"
        placeholder="0x"
      />
    </div>
  );
}
