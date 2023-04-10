import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log(proxyAddress," original justUp(proxy) address");
  const JustUp_V3 = await ethers.getContractFactory("JustUp_V3");
  console.log("upgrade to JustUp_V3...");
  const justUp_V3 = await upgrades.upgradeProxy(proxyAddress, JustUp_V3);

  const implementation = await upgrades.erc1967.getImplementationAddress(justUp_V3.address);

  const admin = await upgrades.erc1967.getAdminAddress(justUp_V3.address);


  console.log(justUp_V3.address," justUp_V2 address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV3'] = justUp_V3.address;
  addressList['adminV3'] = admin;
  addressList['implementationV3'] = implementation;
  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})


