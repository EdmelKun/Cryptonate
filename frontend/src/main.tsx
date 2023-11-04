import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LineaTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const theme = createTheme({
  spacing: (factor: number) => `${0.25 * factor}rem`,
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ThirdwebProvider
        activeChain={LineaTestnet}
        clientId={"871b630efee633d4d564cbae5559c01c"}
        supportedWallets={[metamaskWallet()]}
      >
        <Router>
          <App />
        </Router>
      </ThirdwebProvider>
    </ThemeProvider>
  </React.StrictMode>
);
