// test/1.Box.test.ts
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"

describe("justUp", function () {
  let justUp:Contract;

  beforeEach(async function () {
    const JustUp = await ethers.getContractFactory("JustUp");
    justUp = await JustUp.deploy();
    await justUp.deployed();
  })

  it("should retrieve value previously stored", async function () {
    await justUp.setValue(42);
    expect(await justUp.retrieve()).to.equal(BigNumber.from('42'));

    await justUp.setValue(100);
    expect(await justUp.retrieve()).to.equal(BigNumber.from('100'));
  })
})