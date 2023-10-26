const { expect } = require("chai");

describe("Donation", function () {
  let Donation, donation;
  let owner, donator1, donator2;
  const FUTURE_TIME = Math.floor(Date.now() / 1000) + 1000;

  beforeEach(async () => {
    Donation = await ethers.getContractFactory("Donation");
    [owner, donator1, donator2, ...others] = await ethers.getSigners();
    donation = await Donation.deploy();
    await donation.deployed();
  });

  afterEach(async () => {
    donation = await Donation.deploy();
    await donation.deployed();
  });

  describe("Campaign Creation", function () {
    it("creates a valid campaign", async function () {
      const campaignId = await donation.createCampaign(
        owner.address,
        "Campaign Title",
        "Campaign Description",
        "Campaign Image",
        1000,
        FUTURE_TIME
      );
      const campaign = await donation.campaigns(campaignId);
      expect(campaign.title).to.equal("Campaign Title");
    });

    it("reverts with a past deadline", async function () {
      const PAST_TIME = Math.floor(Date.now() / 1000) - 1000;

      await expect(
        donation.createCampaign(
          owner.address,
          "Invalid Campaign",
          "Description",
          "Image",
          1000,
          PAST_TIME
        )
      ).to.be.revertedWith("The deadline should be in the future");
    });
  });

  describe("Donations", function () {
    beforeEach(async () => {
      await donation.createCampaign(
        owner.address,
        "Campaign",
        "Description",
        "Image",
        1000,
        FUTURE_TIME
      );
    });

    it("updates collectedAmount upon donation", async function () {
      const donationAmount = ethers.utils.parseEther("1");
      await donation
        .connect(donator1)
        .donateToCampaign(0, { value: donationAmount });
      const campaign = await donation.campaigns(0);
      expect(campaign.collectedAmount).to.equal(donationAmount);
    });

    it("logs the donator and donation amount", async function () {
      const donationAmount = ethers.utils.parseEther("0.5");
      await donation
        .connect(donator1)
        .donateToCampaign(0, { value: donationAmount });
      const [donators, donations] = await donation.getDonators(0);
      expect(donators[0]).to.equal(donator1.address);
      expect(donations[0]).to.equal(donationAmount);
    });
  });

  describe("Fetching Campaigns", function () {
    beforeEach(async () => {
      await donation.createCampaign(
        owner.address,
        "Campaign 1",
        "Description 1",
        "Image 1",
        1000,
        FUTURE_TIME
      );
      await donation.createCampaign(
        owner.address,
        "Campaign 2",
        "Description 2",
        "Image 2",
        1500,
        FUTURE_TIME
      );
    });

    it("returns all campaigns", async function () {
      const campaigns = await donation.getCampaigns();
      expect(campaigns.length).to.equal(2);
      expect(campaigns[0].title).to.equal("Campaign 1");
      expect(campaigns[1].title).to.equal("Campaign 2");
    });
  });
});
