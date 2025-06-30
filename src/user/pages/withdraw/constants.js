// Contract addresses and constants for withdraw functionality

// Optimized BEP20 ABI using string format for better performance
export const BEP20_ABI = [
    // Read-only functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",

    // State-changing functions
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Contract addresses
export const MDC_CONTRACT_ADDRESS = "0xf43C9b40C9361b301019C98Fb535affB3ec6C673";

// BSC RPC URL
export const BSC_RPC_URL = "https://bsc-dataseed1.binance.org/";

// Network options
export const NETWORK_OPTIONS = [
    { value: "BEP-20", label: "BSC (BEP-20)" }
];

// Quick amount options
export const QUICK_AMOUNTS = [25, 50, 100, 250, 500, 1000];

// Status color mapping
export const STATUS_COLORS = {
    pending: "yellow",
    processing: "blue",
    completed: "green",
    failed: "red",
    cancelled: "gray"
};

// Status labels
export const STATUS_LABELS = {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
    cancelled: "Cancelled"
};

// Validation rules
export const VALIDATION_RULES = {

    MIN_WITHDRAW_AMOUNT: 25,
    MAX_WITHDRAW_AMOUNT: 10000,
    WALLET_ADDRESS_REGEX: /^0x[a-fA-F0-9]{40}$/
};