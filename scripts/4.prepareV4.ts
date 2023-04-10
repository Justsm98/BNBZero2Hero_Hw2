import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";


//获取代理地址
const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original justUp (proxy) address");

  const JustUp_V4 = await ethers.getContractFactory("JustUp_V4");

  //调用proxyAdmin 来升级v4
  console.log("Preparing upgrade to JustUp_V4...");
  const justUp_V4Address = await upgrades.prepareUpgrade(proxyAddress, JustUp_V4);

  const admin = await upgrades.erc1967.getAdminAddress(proxyAddress);

  console.log(justUp_V4Address, " V4 implementation contract address");

  addressList['proxyV4'] = proxyAddress;
  addressList['adminV4'] = admin;
  addressList['implementationV4'] = justUp_V4Address;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})