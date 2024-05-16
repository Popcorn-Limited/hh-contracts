import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const vault = await deploy("Vault", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`Vault contract: `, vault.address);
};
export default func;
func.id = "deploy_vault"; // id required to prevent reexecution
func.tags = ["Vault"];
