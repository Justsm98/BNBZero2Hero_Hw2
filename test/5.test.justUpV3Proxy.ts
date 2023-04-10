import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("justUp (proxy) V3 with name", function () {
  let justUp:Contract
  let justUpV2:Contract
  let justUpV3:Contract

  beforeEach(async function () {
    const JustUp = await ethers.getContractFactory("JustUp");
    const JustUpV2 = await ethers.getContractFactory("JustUp_V2");
    const JustUpV3 =  await ethers.getContractFactory("JustUp_V3");

    //initialize with 42
    justUp = await upgrades.deployProxy(JustUp, [42], {initializer: 'setValue'});
    justUpV2 = await upgrades.upgradeProxy(justUp.address, JustUpV2);
    justUpV3 = await upgrades.upgradeProxy(justUp.address, JustUpV3);
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //查看v2里的value是不是 v1里的初始值
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('42'));
    //在v3执行+1 
    await justUpV3.increment();
    //查看v2 里边是不是43
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('43'));

    //在v2里设置value为100
    await justUpV2.setValue(100);
    //查看v2 里的值是不是100
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('100'));
  })

  it("should set name correctly in V3", async function () {
    expect(await justUpV3.name()).to.equal("");

    const boxname="my JustUp V3";
    await justUpV3.setName(boxname);
    expect(await justUpV3.name()).to.equal(boxname);
  })

})