import { ethers } from "ethers";
import * as Constants from "../../Utils/config";
import { useRouter } from "next/router";

async function handler(req, res) {
  try {
    const task = req.body;
    const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
    const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      Constants.contractAddress,
      Constants.contractAbi,
      signer
    );
    const tx = await contract.deleteTask(task);
    await tx.wait();

    res.status(200).json({ message: "Task has been deleted" });
  } catch (error) {
    console.log(error);
  }
}

export default handler;
