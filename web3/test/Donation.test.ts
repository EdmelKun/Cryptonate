import { ethers } from "hardhat";
import { expect } from "chai";

describe("Donation", function () {
  it("Should deploy the Donation contract", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.deployed();
    expect(donation.address).to.properAddress;
  });
});
