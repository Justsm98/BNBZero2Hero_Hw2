import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("justUp (proxy) V3 with name", function () {
  let justUp:Contract;
  let justUpV2:Contract;
  let justUpV3:Contract;
  let justUpV4:Contract;

  beforeEach(async function () {
    const JustUp = await ethers.getContractFactory("JustUp");
    const JustUpV2 = await ethers.getContractFactory("JustUp_V2");
    const JustUpV3 =  await ethers.getContractFactory("JustUp_V3");
    const JustUpV4 =  await ethers.getContractFactory("JustUp_V4");

    //initialize with 42
    justUp = await upgrades.deployProxy(JustUp, [42], {initializer: 'setValue'});
    justUpV2 = await upgrades.upgradeProxy(justUp.address, JustUpV2);
    justUpV3 = await upgrades.upgradeProxy(justUp.address, JustUpV3);
    justUpV4 = await upgrades.upgradeProxy(justUp.address, JustUpV4);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await justUpV4.retrieve()).to.equal(BigNumber.from('42'))
    await justUpV4.increment()
    expect(await justUpV4.retrieve()).to.equal(BigNumber.from('43'))

    await justUpV2.setValue(100)
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('100'))
  })

  it("should setName and getName correctly in V4", async function () {
    //name() removed, getName() now
    // expect(boxV4).to.not.have.own.property("name")
    expect(justUpV4.name).to.be.undefined
    expect(await justUpV4.getName()).to.equal("Name: ")

    const boxname="my Box V4"
    await justUpV4.setName(boxname)
    expect(await justUpV4.getName()).to.equal("Name: "+boxname)
  })

})