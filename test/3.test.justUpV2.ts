// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("justUpV2", function () {
  let justUpV2:Contract

  beforeEach(async function () {
    const JustUpV2 = await ethers.getContractFactory("JustUp_V2")
    justUpV2 = await JustUpV2.deploy()
    await justUpV2.deployed()
  });

  it("should retrievevalue previously stored", async function () {
    await justUpV2.setValue(42)
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('42'))

    await justUpV2.setValue(100)
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('100'))
  });

  it('should increment value correctly', async function () {
    await justUpV2.setValue(42)
    await justUpV2.increment()
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('43'))

    await justUpV2.reduce()
    expect(await justUpV2.retrieve()).to.equal(BigNumber.from('42'))
  })
})