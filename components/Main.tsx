"use client";

import UserPay from "@/components/UserPay";
import UserReceive from "@/components/UserReceive";
import axios from "axios";
import { useEffect, useState } from "react";

interface Token {
  symbol: string;
  address: string;
  logoURI: string;
  name: string;
  decimals: number;
}

function Main() {
  const [tokensA, setTokensA] = useState<Token[]>([]);
  const [tokensB, setTokensB] = useState<Token[]>([]);

  const [isSwapDisabled, setIsSwapDisabled] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFetchingTokensA, setIsFetchingTokensA] = useState(false);
  const [isFetchingTokensB, setIsFetchingTokensB] = useState(false);

  useEffect(() => {
    const fetchTokensA = async () => {
      setIsFetchingTokensA(true);
      try {
        const response = await axios.get(
          "https://backendlayerdapp.onrender.com/getTokens"
        );
        // console.log(response);
        // const result = Object.entries(response.data.tokens);
        // const tokensArray = result.map((address, tokenDetails) => ({
        //   ...tokenDetails,
        //   address,
        // }));
        // console.log("TokenA list", tokensArray);
        // setTokensA(tokensArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingTokensA(false);
      }
    };
    fetchTokensA();
  }, []);

  useEffect(() => {
    const fetchTokensB = async () => {
      setIsFetchingTokensB(true);
      try {
        const response = await axios.get(
          "https://backendlayerdapp.onrender.com/getTokens"
        );
        console.log(response);
        const result = Object.entries(response.data.tokens);
        console.log(result);
        const tokensArray = result.map((address, tokenDetails) => ({
          address,
          tokenDetails,
        }));
        console.log("TokenB list", tokensArray);
        // setTokensB(tokensArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingTokensB(false);
      }
    };
    fetchTokensB();
  }, []);

  return (
    <main className="flex w-full h-screen items-center justify-center transition-all duration-500 pt-28 pb-10 overflow-y-scroll">
      <div className="flex flex-col gap-4 max-w-[700px] w-full bg-200 rounded-3xl p-7">
        <UserPay />
        <UserReceive />
        <button
          className={`text-3xl font-semibold w-full  bg-500 hover:bg-600 rounded-3xl py-5`}
          disabled={isSwapDisabled}
          // onClick={swap}
        >
          swap
        </button>
      </div>
      {/* ////// MODALS /////// */}
      {/* <TokenAModal /> */}
      {/* <TokenBModal /> */}
    </main>
  );
}

export default Main;
