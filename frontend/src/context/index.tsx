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
  createCampaign: (formData: any) => Promise<void>;
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

  return (
    <StateContext.Provider
      value={{
        address: ethAddress!,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
