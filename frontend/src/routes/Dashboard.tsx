import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components/DisplayCampaigns";

export const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<any>([]);

  const state = useStateContext();

  const fetchCampaigns = async () => {
    if (state) {
      const campaignData = await state.getCampaigns();
      setCampaigns(campaignData);
    }
  };

  useEffect(() => {
    if (state && state.contract) {
      fetchCampaigns();
    }
  }, [state!.address, state!.contract, campaigns]);

  return (
    <>
      <DisplayCampaigns title="All Campaigns" campaigns={campaigns} />
    </>
  );
};
