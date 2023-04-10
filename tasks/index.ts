import { task } from "hardhat/config";
// import { ethers } from "hardhat";
import { readAddressList } from "../scripts/helper";

task("JustUp_v1", "exchagne with JustUp_v1").setAction(async (_, hre) => {
  
  //和v1 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const justUp = await hre.ethers.getContractAt("JustUp", proxyAddress);

  //查看当前的value 值
  console.log("当前值: ", await justUp.retrieve());

  //设置一个新的value值
  console.log("设置值为95: ", await justUp.setValue(95));

  console.log("当前值: ", await justUp.retrieve());
});

task("justUpv2", "exchagne with justUp v2").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const justUpV2 = await hre.ethers.getContractAt("JustUp_V2", proxyAddress);

  //v2 中新增了2个函数  increment / reduce
  //查看当前的value 值
  console.log("当前值: ", await justUpV2.retrieve());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await justUpV2.reduce());

  //调用reduce 对value-1
  console.log("执行减1操作: ", await justUpV2.reduce());

  //调用increment 对value+1
  console.log("执行减1操作: ", await justUpV2.increment());
});

task("justUpv3", "exchagne with justUp v3").setAction(async (_, hre) => {
  
  //和v2 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList['proxy'];
  //链接合约
  const justUpV3 = await hre.ethers.getContractAt("JustUp_V3", proxyAddress);

  //v2 中新增了1个name变量  setName() 可以修改name的值
  //查看当前的value 值
  console.log("当前值: ", await justUpV3.retrieve());

  //查看当前name 值
  console.log("当前name值: ", await justUpV3.name());

  //设置name 的值
  let boxname="my JustUp V3";
  await justUpV3.setName(boxname);
  
  console.log("当前name值: ", await justUpV3.name());
});