import React from "react";
import ReactDOM from "react-dom/client";
import { LineaTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Dashboard } from "./components/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={LineaTestnet}
      clientId="871b630efee633d4d564cbae5559c01c"
      supportedWallets={[metamaskWallet()]}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
