const { ethers, upgrades } = require("hardhat");
import Marketplace from "../src/Marketplace.json";

async function main() {
  const NFTMV2 = await ethers.getContractFactory("NFTMV2");
  const NFTM = await upgrades.upgradeProxy(Marketplace.address, NFTMV2);
  console.log("NFTMarketplace upgraded");
}

main();