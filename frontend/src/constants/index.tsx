import CampaignIcon from "@mui/icons-material/Campaign";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export const navlinks = [
  {
    name: "dashboard",
    icon: (
      <DashboardIcon
        sx={{
          width: "30px",
          height: "30px",
        }}
        htmlColor="#8b5cf6"
      />
    ),
    link: "/",
  },
  {
    name: "campaign",
    icon: (
      <CampaignIcon
        sx={{
          width: "30px",
          height: "30px",
        }}
        htmlColor="#8b5cf6"
      />
    ),
    link: "/campaigns",
  },
  // {
  //   name: "donors",
  //   icon: (
  //     <SupervisedUserCircleIcon
  //       sx={{
  //         width: "30px",
  //         height: "30px",
  //       }}
  //       htmlColor="#8b5cf6"
  //     />
  //   ),
  //   link: "/donors",
  // },
];
