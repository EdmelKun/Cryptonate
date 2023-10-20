// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Donation {
    struct Campaign {
        address owner;
        string title;
        string description;
        string image;
        uint256 target;
        uint256 deadline;
        uint256 collectedAmount;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be in the future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.image = _image;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.collectedAmount = 0;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        uint256 amountToBeDonated = msg.value;

        Campaign storage campaign = campaigns[_campaignId];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amountToBeDonated);

        (bool sent, ) = payable(campaign.owner).call{value: amountToBeDonated}(
            ""
        );

        if (sent) {
            campaign.collectedAmount =
                campaign.collectedAmount +
                amountToBeDonated;
        }
    }

    function getDonators(
        uint256 _campaignId
    ) public view returns (address[] memory, uint256[] memory) {
        return (
            campaigns[_campaignId].donators,
            campaigns[_campaignId].donations
        );
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
