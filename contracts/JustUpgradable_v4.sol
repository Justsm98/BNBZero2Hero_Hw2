// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./JustUpgradable_v2.sol";

contract JustUp_V4 is JustUp_V2{
    string private name;

    event NameChanged(string name);
    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }

   function getName() public view returns(string memory){
      return string(abi.encodePacked("Name: ",name));
    }
}