// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./JustUpgradable_v2.sol";

/**
 * @dev This is an auxiliary contract meant to be assigned as the admin of a {TransparentUpgradeableProxy}. For an
 * explanation of why you would want to use this see the documentation for {TransparentUpgradeableProxy}.
 */
contract JustUp_V3 is JustUp_V2 {
    
    //增加一个name 变量 并且可以修改
    string public name;

    event NameChanged(string name);
    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }
}