import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./routes/Dashboard";
import { Campaigns } from "./routes/Campaigns";
import { Donators } from "./routes/Donators";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/donators" element={<Donators />} />
      </Routes>
    </>
  );
}
