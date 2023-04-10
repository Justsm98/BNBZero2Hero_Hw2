
import { ethers, upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

async function main() {

  const JustUp = await ethers.getContractFactory("JustUp")
  console.log("Deploying JustUp...")
  
  //部署合约  执行3笔交易  部署 代理合约 逻辑合约  proxyadmin合约
  const justUp = await upgrades.deployProxy(JustUp,[42], { initializer: 'initialize' })

  await justUp.deployed();
  console.log(justUp.address," justUp(proxy) address")

  const admin = await upgrades.erc1967.getAdminAddress(justUp.address);

  console.log(admin," AdminAddress");

  const implementation = await upgrades.erc1967.getImplementationAddress(justUp.address);

  console.log(implementation," ImplementationAddress")

  const addressList = readAddressList();

  addressList['proxy'] = justUp.address;
  addressList['admin'] = admin;
  addressList['implementation'] = implementation;
  storeAddressList(addressList);

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})