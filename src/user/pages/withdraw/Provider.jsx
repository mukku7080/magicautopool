import { ethers } from "ethers";
import { BSC_RPC_URL } from "./constants";

let provider;

try {
    provider = new ethers.JsonRpcProvider(BSC_RPC_URL); // Ethers v6
} catch {
    provider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL); // Fallback for v5
}

export default provider;