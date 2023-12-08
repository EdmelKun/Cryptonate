import { ethers } from "hardhat";
import { expect } from "chai";
import { ContractFactory, Signer } from "ethers";

describe("Donation Contract", function () {
  let Donation: ContractFactory;
  let donation: any;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Donation = await ethers.getContractFactory("Donation");
    donation = await Donation.deploy();
  });

  const getTimestamp = (offsetInSeconds: number) => {
    return Math.floor(Date.now() / 1000) + offsetInSeconds;
  };

  const futureDeadline = getTimestamp(86400);
  const pastDeadline = getTimestamp(-86400);

  const createCampaign = async (
    ownerAddress: string,
    title: string,
    description: string,
    image: string,
    target: bigint,
    deadline: number
  ) => {
    const tx = await donation.createCampaign(
      ownerAddress,
      title,
      description,
      image,
      target,
      deadline
    );
    await tx.wait();

    const campaignCount = await donation.numberOfCampaigns();
    return campaignCount - BigInt(1);
  };

  const parseEther = (value: string) => {
    return ethers.parseEther(value);
  };

  const formatEther = (value: string) => {
    return ethers.formatEther(value);
  };

  describe("Campaign Creation", function () {
    it("Should create a campaign correctly", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Save the Whales",
        "Help us save the whales",
        "whale_image.jpg",
        parseEther("10"),
        futureDeadline
      );

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.owner).to.equal(await owner.getAddress());
      expect(campaign.title).to.equal("Save the Whales");
      expect(campaign.target).to.equal(parseEther("10"));
      expect(campaign.deadline).to.equal(futureDeadline);
      expect(await donation.numberOfCampaigns()).to.equal(1);
    });

    it("Should fail to create a campaign with a past deadline", async function () {
      await expect(
        createCampaign(
          await owner.getAddress(),
          "Past Campaign",
          "Description",
          "past_image.jpg",
          parseEther("1"),
          pastDeadline
        )
      ).to.be.revertedWith("The deadline should be in the future");
    });

    it("Should handle creation of a campaign with zero target", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Zero Target",
        "Zero target test",
        "zero_target.jpg",
        parseEther("0"),
        futureDeadline
      );

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.target).to.equal(parseEther("0"));
    });
  });

  describe("Donations", function () {
    it("Should allow donations to a campaign", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Plant Trees",
        "Planting trees for a better tomorrow",
        "tree_image.jpg",
        parseEther("5"),
        futureDeadline
      );

      await donation
        .connect(addr1)
        .donateToCampaign(campaignId, { value: parseEther("1") });

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.collectedAmount).to.equal(parseEther("1"));
    });

    it("Should handle exact target amount donation", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Target Test",
        "Test for various donation scenarios",
        "target_test.jpg",
        parseEther("5"),
        futureDeadline
      );
      await donation
        .connect(addr1)
        .donateToCampaign(campaignId, { value: parseEther("5") });

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.collectedAmount).to.equal(parseEther("5"));
    });

    it("Should handle donations less than target amount", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Target Test",
        "Test for various donation scenarios",
        "target_test.jpg",
        parseEther("5"),
        futureDeadline
      );
      await donation
        .connect(addr1)
        .donateToCampaign(campaignId, { value: parseEther("3") });

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.collectedAmount).to.equal(parseEther("3"));
    });

    it("Should correctly update the collected amount after multiple donations", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Multi Donation",
        "Multiple donations",
        "multi_donation.jpg",
        parseEther("10"),
        futureDeadline
      );

      await donation
        .connect(addr1)
        .donateToCampaign(campaignId, { value: parseEther("2") });
      await donation
        .connect(addr2)
        .donateToCampaign(campaignId, { value: parseEther("3") });

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.collectedAmount).to.equal(parseEther("5"));
    });

    it("Should allow donations even after the target is reached", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Funding Education",
        "Supporting education programs",
        "education.jpg",
        parseEther("2"),
        futureDeadline
      );

      await donation
        .connect(addr1)
        .donateToCampaign(campaignId, { value: parseEther("2") });

      await expect(
        donation
          .connect(addr1)
          .donateToCampaign(campaignId, { value: parseEther("2") })
      ).not.to.be.reverted;

      const campaign = await donation.campaigns(campaignId);
      expect(campaign.collectedAmount).to.equal(parseEther("4"));
    });
  });

  describe("Data Retreival", function () {
    it("Should retrieve all campaigns correctly", async function () {
      await createCampaign(
        await owner.getAddress(),
        "Campaign 1",
        "Description 1",
        "image1.jpg",
        parseEther("1"),
        futureDeadline
      );
      await createCampaign(
        await addr1.getAddress(),
        "Campaign 2",
        "Description 2",
        "image2.jpg",
        parseEther("2"),
        Math.floor(Date.now() / 1000) + 172800
      );

      const allCampaigns = await donation.getCampaigns();

      expect(allCampaigns.length).to.equal(2);
      expect(allCampaigns[0].title).to.equal("Campaign 1");
      expect(allCampaigns[0].owner).to.equal(await owner.getAddress());
      expect(allCampaigns[1].title).to.equal("Campaign 2");
      expect(allCampaigns[1].owner).to.equal(await addr1.getAddress());
    });

    it("Should retrieve campaign and donator details", async function () {
      const campaignId = await createCampaign(
        await owner.getAddress(),
        "Clean the Ocean",
        "Ocean cleanup initiative",
        "ocean_image.jpg",
        parseEther("20"),
        futureDeadline
      );

      await donation
        .connect(addr1)
        .donateToCampaign(campaignId, { value: parseEther("2") });
      await donation
        .connect(addr2)
        .donateToCampaign(campaignId, { value: parseEther("3") });

      const [donators, donations] = await donation.getDonators(campaignId);
      expect(donators).to.include.members([
        await addr1.getAddress(),
        await addr2.getAddress(),
      ]);
      expect(donations.map(formatEther)).to.deep.equal(["2.0", "3.0"]);
    });
  });
});
