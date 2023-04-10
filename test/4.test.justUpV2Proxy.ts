
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("JustUpV2 (proxy)", function () {
  let justUp: Contract
  let justUpV2: Contract

  beforeEach(async function () {
    const JustUp = await ethers.getContractFactory("JustUp"); 
    const JustUpV2 = await ethers.getContractFactory("JustUp_V2"); 
    //initilize with 42
    justUp = await upgrades.deployProxy(JustUp, [42], { initializer: 'initialize' });
    //执行升级
    justUpV2 = await upgrades.upgradeProxy(justUp.address, JustUpV2);

    console.log(justUpV2.address," justUp/proxy after upgrade");

  })

  it("should retrieve value previously stored and increment correctly", async function () {
    //初始值是不是42
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('42'));

    //执行+1
    await justUpV2.increment();
    //result = 42 + 1 = 43
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('43'));

    //设置值为100
    await justUpV2.setValue(100);
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('100'));

    //执行-1
    await justUpV2.reduce();

    //值为99
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('99'));
  })

})