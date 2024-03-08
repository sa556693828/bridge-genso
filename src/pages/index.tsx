import Menu from "@/components/Menu/Menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-12 text-black">
      <a>Send </a>
      <Menu />
    </main>
  );
}
