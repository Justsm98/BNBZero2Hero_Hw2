
import { ethers, upgrades } from "hardhat"
import { expect } from "chai"
import { Contract, BigNumber } from "ethers"

describe("JustUp (proxy)", function () {
  let justUp:Contract

  beforeEach(async function () {
    const JustUp = await ethers.getContractFactory("JustUp")
        //initilize with 42
        justUp = await upgrades.deployProxy(JustUp, [42], {initializer: 'initialize'})
    })

  it("should retrieve value previously stored", async function () {    
    console.log(justUp.address," justUp(proxy)") 

    expect(await justUp.retrieve()).to.equal(BigNumber.from('42'))

    await justUp.setValue(100)
    expect(await justUp.retrieve()).to.equal(BigNumber.from('100'))
  })

})