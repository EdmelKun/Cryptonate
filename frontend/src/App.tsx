import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Campaigns } from "./routes/Campaigns";
import { Dashboard } from "./routes/Dashboard";
import { Donors } from "./routes/Donors";

export default function App() {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-full mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/donors" element={<Donors />} />
        </Routes>
      </div>
    </div>
  );
}
