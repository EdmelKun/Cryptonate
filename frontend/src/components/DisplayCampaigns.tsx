import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CampaignCard } from "./CampaignCard";
import { DonateModal } from "./DonateModal";
import { DonorsTableModal } from "./DonorsTableModal";

interface CampaignProps {
  title: string;
  campaigns: [];
}

interface CardProps {
  id: number;
  owner: string;
  title: string;
  description: string;
  image: string;
  target: string;
  deadline: string;
  collectedAmount: string;
  handleClick: () => void;
}

export const DisplayCampaigns = ({ title, campaigns }: CampaignProps) => {
  const navigate = useNavigate();
  const [showDonors, setShowDonors] = useState(false);
  const [openDonateModal, setOpenDonateModal] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [donateCampaignId, setDonateCampaignId] = useState(0);
  const [donorsCampaignId, setDonorsCampaignId] = useState(0);
  const [isDonorListLoading, setIsDonorListLoading] = useState(false);

  const [donorsList, setDonorsList] = useState<any>([]);

  const state = useStateContext();

  const fetchDonors = async () => {
    if (state) {
      setIsDonorListLoading(true);
      const donorData = await state.getDonations(donorsCampaignId);
      setDonorsList(donorData);
      setIsDonorListLoading(false);
    }
  };

  useEffect(() => {
    if (state && state.contract) {
      fetchDonors();
    }
  }, [state!.contract, state!.address, showDonors]);

  return (
    <Container className="bg-[#1c1c24]">
      <Typography variant="h4" color={"white"}>
        {title} {`(${campaigns.length})`}
      </Typography>

      <Box className="flex flex-wrap mt-5 gap-6 justify-center">
        {campaigns &&
          campaigns.map((campaign: CardProps) => {
            return (
              <CampaignCard
                key={campaign.id}
                owner={campaign.owner}
                title={campaign.title}
                description={campaign.description}
                image={campaign.image}
                target={campaign.target}
                deadline={campaign.deadline}
                collectedAmount={campaign.collectedAmount}
                handleDonate={() => {
                  setCampaignTitle(campaign.title);
                  setDonateCampaignId(campaign.id);
                  setOpenDonateModal(true);
                }}
                handleViewDonors={() => {
                  setDonorsCampaignId(campaign.id);
                  setShowDonors(true);
                }}
              />
            );
          })}
      </Box>

      <DonateModal
        isOpen={openDonateModal}
        onClose={() => {
          setOpenDonateModal(false);
        }}
        campaignTitle={campaignTitle}
        campaignId={donateCampaignId}
      />

      <DonorsTableModal
        isOpen={showDonors}
        onClose={() => {
          setShowDonors(false);
        }}
        donors={donorsList}
        isLoading={isDonorListLoading}
      />
    </Container>
  );
};
