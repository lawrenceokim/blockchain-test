import Web3 from "web3";
import { erc20ABI } from "wagmi";

export default function useGetBal() {
  const getBal = async (address, tokenAdd) => {
    if (!address) return "0";
    // function to format the balance gotten from the blockchain
    const formatBal = (bal, decimal) => {
      return Number(bal) / 10 ** Number(decimal);
    };

    const web3 = new Web3(window.ethereum);
    let balance;

    if (!tokenAdd) {
      // If no token address then it is eth we are trying to fetch the address of and don't need an abi
      const balanceBI = await web3.eth.getBalance(address);
      balance = formatBal(balanceBI, 18);
      return balance;
    } else {
      // Else we need to use the erc20abi for the token

      const token = new web3.eth.Contract(erc20ABI, tokenAdd);
      const decimals = await token.methods.decimals().call();

      // Get balance
      const balanceBI = await token.methods.balanceOf(address).call();

      balance = formatBal(balanceBI, decimals);
      return balance;
    }
    // Convert BigInts to strings and format
    // return balance;
  };
  return getBal;
}
