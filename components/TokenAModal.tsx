import Image from "next/image";
import React from "react";

interface TokenModalProps {
  setShowModalA: Function;
  showModalA: boolean;
  isFetchingTokensA: boolean;
  searchQueryA: string;
  setSearchQueryA: Function;
  prioritizeAndFilterTokens: Function;
  tokensA: any;
  selectedTokenB: any;
  setSelectedTokenA: Function;
  fetchSelectedTokenABalance: Function;
}

function TokenAModal({
  setShowModalA,
  showModalA,
  isFetchingTokensA,
  searchQueryA,
  setSearchQueryA,
  prioritizeAndFilterTokens,
  tokensA,
  selectedTokenB,
  setSelectedTokenA,
  fetchSelectedTokenABalance,
}: TokenModalProps) {
  return (
    showModalA && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={() => setShowModalA(false)}
      >
        <div
          className="bg-white dark:bg-slate-900 dark:border dark:border-primary/40 rounded-2xl shadow-lg z-10"
          style={{ width: "400px", height: "500px", overflowY: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          {isFetchingTokensA ? (
            <p className="text-red-500 mb-3 font-semibold pt-4 pb-[-10px] px-2">
              Please wait for few seconds to load the tokens{" "}
            </p>
          ) : (
            ""
          )}

          <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 w-full pt-6 pb-4 px-2">
            <input
              type="search"
              placeholder="Search token A"
              value={searchQueryA}
              onChange={(e) => setSearchQueryA(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-primary/60 focus:outline-none focus:border-primary focus:bg-primary/10 shadow-md bg-primary/5"
            />
          </div>

          {isFetchingTokensA ? (
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
                tokensA,
                ["USDC", "USDT", "DAI", "WETH", "ARB", "AAVE"],
                selectedTokenB,
                searchQueryA
              ).map((tokenA: any, index: any): any => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-primary/20 rounded-md cursor-pointer bg-primary/10 mb-3"
                  onClick={() => {
                    console.log("all data of tokenA selected", tokenA);
                    setSelectedTokenA(tokenA);
                    fetchSelectedTokenABalance(tokenA.address);
                    setShowModalA(false);
                  }}
                >
                  <div className="flex items-center">
                    <Image
                      src={tokenA.logoURI}
                      alt={tokenA.symbol}
                      className="w-8 h-8 mr-3"
                    />
                    <div>
                      <div className="font-semibold">{tokenA.symbol}</div>
                      <div className="text-darkDivide dark:text-gray/80">
                        {tokenA.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default TokenAModal;
