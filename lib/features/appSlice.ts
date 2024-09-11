import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//   // mainnet,
//   optimism,
//   bsc,
//   arbitrum,
//   avalanche,
//   // fantom,
//   polygon,
//   goerli,
//   // moonbeam,
// } from "wagmi/chains";

import arbitrumLogo from "@/public/network/arbitrum-logo.png.png";
import sepoliaLogo from "@/public/network/gnosis-logo.png.png";
import polygonLogo from "@/public/network/polygon-logo.png.png";
import optimismLogo from "@/public/network/optimism-logo.png.png";
import avalancheLogo from "@/public/network/avalanche-logo.png.png";
import bnbLogo from "@/public/network/bnb-logo.png.png";

interface AppState {
  chains: any[];
  wallet: any;
  selectedChain: any;
  showSwitchNetwork: boolean;
  connectWallet: boolean;
  notifications: [];
  loading: any;
  currentAcc: any;
  accounts: [];
}

const initialState: AppState = {
  chains: [
    // { chainName: "Select chain", logo: mainnetLogo, chain: "select chain" },
    // { chainName: "Arbitrum", logo: arbitrumLogo, chain: arbitrum },
    // { chainName: "BSC", logo: bnbLogo, chain: bsc },
    // { chainName: "Goerli", logo: sepoliaLogo, chain: goerli },
    // { chainName: "Polygon", logo: polygonLogo, chain: polygon },
    // { chainName: "Optimism", logo: optimismLogo, chain: optimism },
    // { chainName: "Avalanche", logo: avalancheLogo, chain: avalanche },
    // { chainName: "Fantom", logo: fantomLogo, chain: fantom },
    // { chainName: "Moonbeam", logo: sepoliaLogo, chain: moonbeam },
  ],
  wallet: { account: null, connected: null }, // connected: currently connected chain
  selectedChain: {},
  showSwitchNetwork: false, // Boolean for if the show switch network notification should show
  connectWallet: true,
  notifications: [
    // {
    //   header: "Some Error", // just like header or title text can be ommitted
    //   bulletPoint: true, // do you want bulletpoints or not in front of your notification
    //   info: ["error no 1", "error no 2"], // array of strings u want to display
    //   overlay: true, // boolean value
    //   type: "error", //one of four types => "error", "warning", "normal", "successful", "loading"
    // },
  ],
  loading: {
    //   header: "Some Error", // just like header or title text can be ommitted
    //   bulletPoint: true, // do you want bulletpoints or not in front of your notification
    //   info: ["error no 1", "error no 2"], // array of strings u want to display
    //   overlay: true, // boolean value
    //   type: "error", //one of four types => "error", "warning", "normal", "successful", "loading"
  },
  currentAcc: {
    // address: "",
    // id: "",
  }, // Address of the dsaAccount thhe user is currenntly on
  accounts: [
    // {
    //   address: "0x52aD154893E078274337A2654Bf8A9fF67F92c7C",
    //   id: "#3",
    // },
  ],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateWallet: (state, action) => {
      return { ...state, wallet: action.payload };
    },
    // updateChain: (action) => {
    //   return { currentChain: action.payload };
    // },
    updateConnectWallet: (state, action) => {
      return { ...state, connectWallet: action.payload };
    },
    updateNotifications: (state, action) => {
      return { ...state, notifications: action.payload };
    },
    updateLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    updateShowSwitchNetwork: (state, action) => {
      return { ...state, showSwitchNetwork: action.payload };
    },
    updateSelectedChain: (state, action) => {
      // console.log(action.payload);
      return { ...state, selectedChain: action.payload };
    },
    updateCurrentAcc: (state, action) => {
      return { ...state, currentAcc: action.payload || {} };
    },
    clearCurrentAcc: (state) => {
      return { ...state, currentAcc: {} };
    },
    // updateAccounts: (state, action) => {
    //   return { ...state, accounts: [...state.accounts, action.payload] };
    // },
  },
});

export const {
  updateConnectWallet,
  updateLoading,
  updateNotifications,
  updateSelectedChain,
  updateShowSwitchNetwork,
  updateWallet,
  // updateAccounts,
  updateCurrentAcc,
  clearCurrentAcc,
} = appSlice.actions;
export default appSlice.reducer;
