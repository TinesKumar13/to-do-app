import { ethers } from "ethers";
import * as Constants from "../../Utils/config";

async function handler(req, res) {
    try {
        const id = req.body;
        const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
        const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
        const tx = await contract.markTaskAsFinished(id);
        await tx.wait();

        res.status(200).json({message : "Task has been marked as complete"});
    } catch (error) {
        console.log(error)
    }
}

export default handler;