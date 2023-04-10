
import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original justUp(proxy) address");
  const JustUp_V2 = await ethers.getContractFactory("SJustUp_V2");
  console.log("upgrade to JustUp_V2...");
  const justUp_V2 = await upgrades.upgradeProxy(proxyAddress, JustUp_V2);

  const implementation = await upgrades.erc1967.getImplementationAddress(justUp_V2.address);

  const admin = await upgrades.erc1967.getAdminAddress(justUp_V2.address);

  console.log(justUp_V2.address," justUp_V2 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV2'] = justUp_V2.address;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


