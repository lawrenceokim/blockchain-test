"use client";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

import Main from "@/components/Main";

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <Main />
    </WagmiConfig>
  );
}
