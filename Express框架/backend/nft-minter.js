import {ethers, JsonRpcProvider} from "ethers";
import fs from 'fs';

export async function mint(to, uri) {
    const provider = new JsonRpcProvider("http://localhost:8545");
    const signer = await provider.getSigner();
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const abi = JSON.parse(fs.readFileSync("./abis/MyNFT.json"));
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.safeMint(to, uri);
    console.log(result.hash);
}

