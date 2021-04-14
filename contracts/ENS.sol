// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract ENS {
    event SetENSName(string name);

    string public ensName;

    constructor(string memory _ensName) {
        console.log("\tDeploying an ENSName contract with ensName:", _ensName);
        ensName = _ensName;
    }

    function getENSName() public view returns (string memory) {
        return ensName;
    }

    function setENSName(string memory _ensName) public {
        console.log("\tChanging ensName from '%s' to '%s'", ensName, _ensName);
        ensName = _ensName;
        emit SetENSName(_ensName);
    }
}