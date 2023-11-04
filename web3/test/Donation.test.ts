import { ethers } from "hardhat";
import { expect } from "chai";

describe("Deployment", function () {
  it("Should deploy the Donation contract", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    expect(await donation.getAddress()).to.properAddress;
  });
});
