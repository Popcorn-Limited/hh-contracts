import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:withdraw", "Calls the withdraw function of Lock Contract")
  .addOptionalParam("address", "Optionally specify the Lock address to withdraw")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const Lock = taskArguments.address ? { address: taskArguments.address } : await deployments.get("Lock");

    const signers = await ethers.getSigners();
    console.log(taskArguments.address);

    const lock = await ethers.getContractAt("Lock", Lock.address);

    const initialBalance = await ethers.provider.getBalance(Lock.address);
    await lock.connect(signers[taskArguments.account]).withdraw();
    const finalBalance = await ethers.provider.getBalance(Lock.address);

    console.log("Contract balance before withdraw", ethers.formatEther(initialBalance));
    console.log("Contract balance after withdraw", ethers.formatEther(finalBalance));

    console.log("Lock Withdraw Success");
  });