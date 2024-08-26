"use client";

import UserPay from "@/components/UserPay";
import UserReceive from "@/components/UserReceive";
import Web3 from "web3";
import {
  useNetwork,
  useAccount,
  useSendTransaction,
  useTransaction,
} from "wagmi";

export default function Home() {
  return (
    <main className="flex w-full h-screen items-center justify-center transition-all duration-500 pt-28 pb-10 overflow-y-scroll">
      <div className="flex flex-col gap-4 max-w-[700px] w-full bg-200 rounded-3xl p-7">
        <UserPay />
        <UserReceive />
        <button className="text-3xl font-semibold w-full  bg-500 hover:bg-600 rounded-3xl py-5">
          swap
        </button>
      </div>
    </main>
  );
}
