import Image from "next/image";
import React from "react";

interface TokenModalProps {
  setShowModalB: Function;
  showModalB: boolean;
  isFetchingTokensB: boolean;
  searchQueryB: string;
  setSearchQueryB: Function;
  prioritizeAndFilterTokens: Function;
  tokensB: any;
  selectedTokenA: any;
  setSelectedTokenB: Function;
  tokenBalancesB: any;
}

function TokenBModal({
  setShowModalB,
  showModalB,
  isFetchingTokensB,
  searchQueryB,
  setSearchQueryB,
  prioritizeAndFilterTokens,
  tokensB,
  selectedTokenA,
  setSelectedTokenB,
  tokenBalancesB,
}: TokenModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={() => setShowModalB(false)}
    >
      <div
        className="bg-white  dark:bg-slate-900 dark:border dark:border-primary/40  rounded-2xl shadow-lg z-10"
        style={{ width: "400px", height: "500px", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {isFetchingTokensB ? (
          <p className="text-red-500 mb-3 font-semibold pt-4 pb-[-10px] px-2">
            Please wait for few seconds to load the tokens{" "}
          </p>
        ) : (
          ""
        )}

        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 w-full pt-6 pb-4 px-2">
          <input
            type="search"
            placeholder="Search token B"
            value={searchQueryB}
            onChange={(e) => setSearchQueryB(e.target.value)}
            className="w-full p-4 rounded-xl border-2 border-primary/60 focus:outline-none focus:border-primary focus:bg-primary/10 shadow-md bg-primary/5"
          />
        </div>
        {isFetchingTokensB ? (
          <div className="space-y-2 px-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 rounded-lg flex items-center justify-center bg-gradient-to-r from-shimmerBg dark:from-primary/50 dark:to-primary/40  via-shimmerHighlight dark:via-primaryLight to-shimmerBg animate-shimmer"
              >
                <span className="text-gray text-base dark:text-white">
                  Please wait Loading token list...
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4">
            {prioritizeAndFilterTokens(
              tokensB,
              ["USDC", "USDT", "DAI", "WETH", "ARB", "AAVE"],
              selectedTokenA,
              searchQueryB
            ).map((tokenB: any, index: any): any => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-primary/20 rounded-md cursor-pointer bg-primary/10 mb-3"
                onClick={() => {
                  console.log(
                    "all data of tokenB selected",
                    tokenB,
                    tokenBalancesB[tokenB.address]
                  );
                  setSelectedTokenB(tokenB);
                  setShowModalB(false);
                }}
              >
                <div className="flex items-center">
                  <Image
                    src={tokenB.logoURI}
                    alt={tokenB.symbol}
                    className="w-8 h-8 mr-3"
                  />
                  <div>
                    <div className="font-semibold">{tokenB.symbol}</div>
                    <div className="text-darkDivide dark:text-gray/80">
                      {tokenB.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenBModal;
