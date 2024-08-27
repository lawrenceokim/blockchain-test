"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import UserPay from "@/components/UserPay";
import UserReceive from "@/components/UserReceive";
import useGetBal from "@/hooks/useGetBal";
import abi from "@/constant/arbitrumABI.json";
import ercabi from "@/constant/ercABI.json";
import Web3 from "web3";
import {
  useNetwork,
  useAccount,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { updateLoading, updateNotifications } from "@/lib/features/appSlice";
import TokenAModal from "./TokenAModal";

interface Token {
  symbol: string;
  address: string;
  logoURI: string;
  name: string;
  decimals: number;
}

interface NetworkConfig {
  address: string;
  chainId: string;
  abi: any;
  etherscanPrefix: string;
  ercAbi: any;
}

interface AppState {
  app: { messages: any; notifications: any[] };
}

function Main() {
  const [showModalA, setShowModalA] = useState(false);
  const [tokensA, setTokensA] = useState<Token[]>([]);
  const [selectedTokenA, setSelectedTokenA] = useState<Token | null>(null);
  const [searchQueryA, setSearchQueryA] = useState("");

  const [showModalB, setShowModalB] = useState(false);
  const [tokensB, setTokensB] = useState<Token[]>([]);
  const [selectedTokenB, setSelectedTokenB] = useState<Token | null>(null);
  const [searchQueryB, setSearchQueryB] = useState("");

  const [tokenBalancesA, setTokenBalancesA] = useState<Record<string, string>>(
    {}
  );
  const [tokenBalancesB, setTokenBalancesB] = useState<Record<string, string>>(
    {}
  );
  const { notifications, currentAcc } = useAppSelector((state) => state.app);
  const getBal = useGetBal();

  const { chain } = useNetwork();
  const { address } = useAccount();
  const dispatch = useAppDispatch();

  const [amountPay, setAmountPay] = useState("");
  const [amountPayJSBI, setAmountPayJSBI] = useState("");
  const [amountReceive, setAmountReceive] = useState("");

  const [isSwapDisabled, setIsSwapDisabled] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFetchingTokensA, setIsFetchingTokensA] = useState(false);
  const [isFetchingTokensB, setIsFetchingTokensB] = useState(false);

  const [allowance, setAllowance] = useState(0);
  const [isApproveDisabled, setIsApproveDisabled] = useState(true);
  const [isSwapButtonDisabled, setIsSwapButtonDisabled] = useState(true);

  const [transactionInitiated, setTransactionInitiated] = useState(false);
  const [transactionInitiatedApprove, setTransactionInitiatedApprove] =
    useState(false);

  const resetComponentState = () => {
    setShowModalA(false);
    setTokensA([]);
    setSelectedTokenA(null);
    setSearchQueryA("");
    setShowModalB(false);
    setTokensB([]);
    setSelectedTokenB(null);
    setSearchQueryB("");
    setTokenBalancesA({});
    setTokenBalancesB({});
    setAmountPay("");
    setAmountPayJSBI("");
    setAmountReceive("");
    setIsSwapDisabled(false);
    setIsOverlayVisible(false);
    setIsFetchingTokensA(false);
    setIsFetchingTokensB(false);
    setAllowance(0);
    setIsApproveDisabled(true);
    setIsSwapButtonDisabled(true);
  };

  const networks: Record<string, NetworkConfig> = {
    arbitrum: {
      address: "0x34b04687269e47E50BB999231393D58F9cb9E9Ae",
      chainId: "0xA4B1",
      abi: abi,
      etherscanPrefix: "https://arbiscan.io",
      ercAbi: ercabi,
    },
  };

  const networkConfig = networks?.[chain?.network || ""] || null;

  const functionGetbal = async (tokenaddress: string) => {
    let balance;
    if (tokenaddress === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      balance = await getBal(currentAcc.address);
    } else {
      balance = await getBal(currentAcc.address, tokenaddress);
    }
    return balance;
  };

  const fetchSelectedTokenABalance = async (tokenAddress: string) => {
    const balance = await functionGetbal(tokenAddress);
    console.log("balance is this ====", balance);
    setTokenBalancesA({ [tokenAddress]: balance });
  };

  const prioritizeAndFilterTokens = (
    tokens: Token[],
    prioritySymbols: string[],
    selectedToken: Token | null,
    searchQuery: string
  ) => {
    const searchQueryLower = searchQuery.toLowerCase();

    const filteredTokens = tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchQueryLower) &&
        token.address !== selectedToken?.address
    );

    const priorityTokens = filteredTokens
      .filter((token) => prioritySymbols.includes(token.symbol))
      .sort(
        (a, b) =>
          prioritySymbols.indexOf(a.symbol) - prioritySymbols.indexOf(b.symbol)
      );

    const otherTokens = filteredTokens.filter(
      (token) => !prioritySymbols.includes(token.symbol)
    );

    return [...priorityTokens, ...otherTokens];
  };

  const formatBalanceForDisplay = (balance: string) => {
    return balance ? parseFloat(balance).toFixed(6) : "0.000000";
  };

  const fetchTokensA = async () => {
    setIsFetchingTokensA(true);
    try {
      const response = await axios.get(
        "https://backendlayerdapp.onrender.com/getTokens"
      );
      const tokensArray = Object.entries(response.data.tokens).map(
        ([address, tokenDetails]) => ({
          ...tokenDetails,
          address,
        })
      );
      console.log("TokenA list", tokensArray);
      setTokensA(tokensArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingTokensA(false);
    }
  };

  const fetchTokensB = async () => {
    setIsFetchingTokensB(true);
    try {
      const response = await axios.get(
        "https://backendlayerdapp.onrender.com/getTokens"
      );
      const tokensArray = Object.entries(response.data.tokens).map(
        ([address, tokenDetails]) => ({
          ...tokenDetails,
          address,
        })
      );
      console.log("TokenB list", tokensArray);
      setTokensB(tokensArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingTokensB(false);
    }
  };

  const handleSelectTokenClickA = () => {
    fetchTokensA();
    setShowModalA(true);
  };

  const handleSelectTokenClickB = () => {
    fetchTokensB();
    setShowModalB(true);
  };

  const swap = () => {
    if (
      selectedTokenA &&
      selectedTokenB &&
      parseFloat(amountPay) <=
        parseFloat(tokenBalancesA[selectedTokenA.address] || "0")
    ) {
      setIsOverlayVisible(true);
    } else {
      console.log("Swap conditions not met.");
    }
  };

  const handleAmountPayChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log("amt we enter", value);
    const amount = Number(value) * Math.pow(10, selectedTokenA?.decimals || 0);
    console.log("json amt", amount);

    setAmountPayJSBI(amount.toString());
    setAmountPay(value);

    if (selectedTokenA && selectedTokenB) {
      try {
        const response = await axios.get(
          "https://backendlayerdapp.onrender.com/getTokenBamt",
          {
            params: {
              src: selectedTokenA.address,
              dst: selectedTokenB.address,
              amount: amount.toString(),
            },
          }
        );
        console.log("response is", response.data);
        const amountB = (
          response.data.toAmount / Math.pow(10, selectedTokenB.decimals)
        ).toFixed(5);
        setAmountReceive(amountB);
      } catch (error) {
        console.error("Error fetching receive amount", error);
      }
    }

    if (selectedTokenA) {
      const maxBalanceA = parseFloat(
        tokenBalancesA[selectedTokenA.address] || "0"
      );
      const enteredAmount = parseFloat(value);
      setIsSwapDisabled(enteredAmount > maxBalanceA);

      if (enteredAmount <= maxBalanceA) {
        await functionAllowanceCheck(value);
      }
    }
  };

  const setMaxAmount = async () => {
    if (!selectedTokenA) return;

    const maxBalanceA = tokenBalancesA[selectedTokenA.address] || "0";
    console.log("max balance A", maxBalanceA);
    const amount =
      parseFloat(maxBalanceA) * Math.pow(10, selectedTokenA.decimals);

    setAmountPay(maxBalanceA);
    setAmountPayJSBI(amount.toString());

    setIsSwapDisabled(false);

    await functionAllowanceCheck(maxBalanceA);

    try {
      const response = await axios.get(
        "https://backendlayerdapp.onrender.com/getTokenBamt",
        {
          params: {
            src: selectedTokenA.address,
            dst: selectedTokenB.address,
            amount: amount.toString(),
          },
        }
      );
      const amountB = (
        response.data.toAmount / Math.pow(10, selectedTokenB.decimals)
      ).toFixed(5);
      setAmountReceive(amountB);
    } catch (error) {
      console.error("Error fetching equivalent tokenB amount", error);
    }
  };

  useEffect(() => {
    if (selectedTokenA) {
      fetchSelectedTokenABalance(selectedTokenA.address);
    }
  }, [selectedTokenA]);

  async function functionAllowanceCheck(currentValue: string) {
    if (!selectedTokenA) return;

    if (
      selectedTokenA?.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ) {
      setIsApproveDisabled(true);
      setIsSwapButtonDisabled(false);
    } else {
      try {
        const web3 = new Web3(window.ethereum);

        const erc20Token = new web3.eth.Contract(
          networkConfig?.ercAbi,
          selectedTokenA?.address
        );

        const oneInchAddress = "0x1111111254EEB25477B68fb85Ed929f73A960582";

        console.log(
          "erc20Token and selectedtoken",
          erc20Token,
          selectedTokenA?.address
        );

        const value = await erc20Token.methods
          .allowance(currentAcc.address, oneInchAddress)
          .call();

        const allowedValue = Number(value);
        setAllowance(allowedValue);

        const requiredValue =
          parseFloat(currentValue) * Math.pow(10, selectedTokenA.decimals);

        console.log(
          "allowedValue and requiredValue",
          allowedValue,
          requiredValue
        );

        if (allowedValue < requiredValue) {
          setIsApproveDisabled(false);
          setIsSwapButtonDisabled(true);
        } else {
          setIsApproveDisabled(true);
          setIsSwapButtonDisabled(false);
        }
      } catch (error) {
        console.error("Error fetching Allowance value", error);
      }
    }
  }

  // Approve functionality
  const { sendTransaction: sendTransactionApprove, data: ApproveResult } =
    useSendTransaction({
      onError: (error) => {
        let errorMessage;

        if (
          error?.message?.includes("insufficient-balance") ||
          error?.message?.includes("transfer amount exceeds balance")
        ) {
          errorMessage =
            "You don't have sufficient funds. Please ensure you have enough funds to complete this transaction.";
        } else if (
          error?.message?.includes("User denied transaction signature")
        ) {
          errorMessage = "The transaction has been rejected by the user.";
        } else {
          errorMessage =
            "Oops...Transaction could not complete please check developer console to know the reason for failure.";
        }

        dispatch(updateLoading({}));
        dispatch(
          updateNotifications([
            ...notifications,
            {
              type: "error",
              info: [errorMessage],
              overlay: true,
            },
          ])
        );
      },
    });

  const {
    data: transactionResultApprove,
    isLoading: isWaitingForTransactionApprove,
  } = useWaitForTransaction({
    confirmations: 1,
    hash: ApproveResult?.hash,
  });

  async function approveAction() {
    console.log("approve function called");

    if (!networkConfig || !currentAcc || !address) {
      console.error(`Configuration for network ${chain?.network} not found.`);
      return;
    }

    const functionAbi = {
      constant: false,
      inputs: [
        {
          name: "_targetNames",
          type: "string[]",
        },
        {
          name: "_datas",
          type: "bytes[]",
        },
        {
          name: "_origin",
          type: "address",
        },
      ],
      name: "cast",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    };

    const web3 = new Web3(window.ethereum);
    const connector = new web3.eth.Contract(
      networkConfig.abi,
      networkConfig.address
    );

    console.log(
      "all input check for approve",
      selectedTokenA?.address,
      amountPayJSBI
    );

    const encodeApprove = connector.methods
      ._approve(selectedTokenA?.address, amountPayJSBI)
      .encodeABI();
    console.log("encode and address", encodeApprove, address);

    const encodedData = web3.eth.abi.encodeFunctionCall(functionAbi, [
      ["LayerConnectOneInchV5"],
      [encodeApprove],
      address,
    ]);

    console.log("encoded data", encodedData);

    if (encodedData) {
      setTransactionInitiatedApprove(true);
      sendTransactionApprove({
        to: currentAcc.address,
        data: encodedData,
        value: 0,
      });
    }
  }

  useEffect(() => {
    const checkAndUpdateStateAfterApproval = async () => {
      if (transactionInitiatedApprove) {
        if (isWaitingForTransactionApprove) {
          dispatch(
            updateLoading({
              type: "loading",
              header: "Approve",
              info: ["Transaction pending..."],
              overlay: true,
            })
          );
        } else if (transactionResultApprove?.transactionHash) {
          setTransactionInitiatedApprove(false);

          await functionAllowanceCheck(amountPay);

          setTimeout(() => {
            dispatch(updateLoading({}));

            dispatch(
              updateNotifications([
                ...notifications,
                {
                  type: "successful",
                  header: "Transaction Successful",
                  info: [
                    "Transaction Hash: ",
                    {
                      text:
                        transactionResultApprove.transactionHash.slice(0, 26) +
                        "...",
                      link: `${networkConfig?.etherscanPrefix}/tx/${transactionResultApprove.transactionHash}`,
                    },
                  ],
                  overlay: true,
                },
              ])
            );
          }, 10000);
        }
      }
    };

    checkAndUpdateStateAfterApproval();
  }, [
    transactionInitiatedApprove,
    isWaitingForTransactionApprove,
    transactionResultApprove,
    amountPay,
  ]);

  // Swap functionality
  const { sendTransaction: sendTransactionSwap, data: swapData } =
    useSendTransaction({
      onError: (error) => {
        let errorMessage;

        if (
          error?.message?.includes("insufficient-balance") ||
          error?.message?.includes("transfer amount exceeds balance")
        ) {
          errorMessage =
            "You don't have sufficient funds. Please ensure you have enough funds to complete this transaction.";
        } else if (
          error?.message?.includes("User denied transaction signature")
        ) {
          errorMessage = "The transaction has been rejected by the user.";
        } else {
          errorMessage =
            "Oops...Transaction could not complete please check developer console to know the reason for failure.";
        }

        dispatch(updateLoading({}));
        dispatch(
          updateNotifications([
            ...notifications,
            {
              type: "error",
              info: [errorMessage],
              overlay: true,
            },
          ])
        );
      },
    });

  const { data: transactionResult, isLoading: isWaitingForTransaction } =
    useWaitForTransaction({
      confirmations: 1,
      hash: swapData?.hash,
    });

  async function swapAction() {
    try {
      const response = await axios.get(
        "https://backendlayerdapp.onrender.com/getSwapData",
        {
          params: {
            src: selectedTokenA?.address,
            dst: selectedTokenB?.address,
            amount: amountPayJSBI,
            from: currentAcc.address,
            slippage: 2,
          },
        }
      );
      console.log("response swap data is", response.data);

      if (!networkConfig || !currentAcc || !address) {
        console.error(`Configuration for network ${chain?.network} not found.`);
        return;
      }

      const functionAbi = {
        constant: false,
        inputs: [
          {
            name: "_targetNames",
            type: "string[]",
          },
          {
            name: "_datas",
            type: "bytes[]",
          },
          {
            name: "_origin",
            type: "address",
          },
        ],
        name: "cast",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      };

      const web3 = new Web3(window.ethereum);
      const connector = new web3.eth.Contract(
        networkConfig.abi,
        networkConfig.address
      );

      console.log(
        "all input check for swap",
        selectedTokenB?.address,
        selectedTokenA?.address,
        amountPayJSBI,
        response.data.toAmount,
        response.data.tx.data,
        0
      );

      const encodeSwap = connector.methods
        .sell(
          selectedTokenB?.address,
          selectedTokenA?.address,
          amountPayJSBI,
          response.data.toAmount,
          response.data.tx.data,
          0
        )
        .encodeABI();
      console.log("swap and address", encodeSwap, address);

      const encodedData = web3.eth.abi.encodeFunctionCall(functionAbi, [
        ["LayerConnectOneInchV5"],
        [encodeSwap],
        address,
      ]);

      console.log("encoded data", encodedData);

      dispatch(
        updateLoading({
          type: "loading",
          header: "Swap",
          info: [" Waiting for transaction confirmation..."],
          overlay: true,
        })
      );

      if (encodedData) {
        setTransactionInitiated(true);
        sendTransactionSwap({
          to: currentAcc.address,
          data: encodedData,
          value: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching swap data", error);
    }
  }

  useEffect(() => {
    if (transactionInitiated) {
      if (isWaitingForTransaction) {
        dispatch(
          updateLoading({
            type: "loading",
            header: "Swap",
            info: ["Transaction pending..."],
            overlay: true,
          })
        );
      } else if (transactionResult?.transactionHash) {
        setTransactionInitiated(false);
        dispatch(updateLoading({}));

        dispatch(
          updateNotifications([
            ...notifications,
            {
              type: "successful",
              header: "Transaction Successful",
              info: [
                "Transaction Hash: ",
                {
                  text: transactionResult.transactionHash.slice(0, 26) + "...",
                  link: `${networkConfig?.etherscanPrefix}/tx/${transactionResult.transactionHash}`,
                },
              ],
              overlay: true,
            },
          ])
        );
        resetComponentState();
        setIsOverlayVisible(false);
      }
    }
  }, [transactionInitiated, isWaitingForTransaction, transactionResult]);
  return (
    <main className="flex w-full h-screen items-center justify-center transition-all duration-500 pt-28 pb-10 overflow-y-scroll">
      <div className="flex flex-col gap-4 max-w-[700px] w-full bg-200 rounded-3xl p-7">
        <UserPay
          amountPay={amountPay}
          handleAmountPayChange={handleAmountPayChange}
          handleSelectTokenClickA={handleSelectTokenClickA}
          selectedTokenA={selectedTokenA}
          formatBalanceForDisplay={formatBalanceForDisplay}
          tokenBalancesA={tokenBalancesA}
          setMaxAmount={setMaxAmount}
        />
        <UserReceive
          amountReceive={amountReceive}
          handleSelectTokenClickB={handleSelectTokenClickB}
          selectedTokenB={selectedTokenB}
        />
        <button
          className={`text-3xl font-semibold w-full  bg-500 hover:bg-600 rounded-3xl py-5 ${
            isSwapDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isSwapDisabled}
          onClick={swap}
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
