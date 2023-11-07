import React, { useContext, createContext } from "react";
import {
  useAddress,
  useMetamask,
  useContract,
  useContractWrite,
  MetaMaskWallet,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

type StateContextType = {
  address: string | null;
  contract: any | null;
  connect: () => Promise<MetaMaskWallet>;
  createCampaign: (formData: any) => Promise<any>;
  getCampaigns: () => Promise<any>;
  getUserCampaigns: () => Promise<any>;
  donateToCampaign: ({ campaignId, amount }: DonateType) => Promise<any>;
  getDonations: (campaignId: number) => Promise<any>;
};

type StateContextProviderProps = {
  children: React.ReactNode;
};

type FormData = {
  title: string;
  description: string;
  image: string;
  target: number;
  deadline: string;
};

type CampaignType = {
  owner: string;
  title: string;
  description: string;
  image: string;
  target: string;
  deadline: string;
  collectedAmount: string;
};

type DonateType = {
  campaignId: number;
  amount: string;
};

type CampaignArgs = [string, string, string, string, number, number];

const StateContext = createContext<StateContextType | null>(null);

export const StateContextProvider: React.FC<StateContextProviderProps> = ({
  children,
}) => {
  const { contract } = useContract(
    "0xCdc058025d5AdC5041b27e76CFe57fe86f0A098F"
  );

  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const ethAddress = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (formData: FormData) => {
    try {
      const args: CampaignArgs = [
        ethAddress!,
        formData.title,
        formData.description,
        formData.image,
        formData.target,
        new Date(formData.deadline).getTime(),
      ];
      const data = await createCampaign({ args });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call fail", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract!.call("getCampaigns");

    const mappedCampaigns = campaigns.map(
      (campaign: CampaignType, index: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        image: campaign.image,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: Number(campaign.deadline),
        collectedAmount: ethers.utils.formatEther(
          campaign.collectedAmount.toString()
        ),
        id: index,
      })
    );

    return mappedCampaigns;
  };

  const getUserCampaigns = async () => {
    const campaigns = await getCampaigns();

    const userCampaigns = campaigns.filter((campaign: CampaignType) => {
      return campaign.owner === ethAddress!;
    });

    return userCampaigns;
  };

  const donateToCampaign = async ({ campaignId, amount }: DonateType) => {
    const data = await contract!.call("donateToCampaign", [campaignId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (campaignId: number) => {
    const donations = await contract!.call("getDonators", [campaignId]);
    const totalDonations = donations[0].length;

    const mappedDonations = [];

    for (let i = 0; i < totalDonations; i++) {
      mappedDonations.push({
        donor: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
        id: i,
      });
    }

    return mappedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address: ethAddress!,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donateToCampaign,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
