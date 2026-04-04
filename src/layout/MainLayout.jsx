import React from "react";
import { useApp } from "../context/AppContext";

const MainLayout = ({ children, setPage }) => {

  const { role, setRole } = useApp();

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">💰 Finance</h1>

          <ul className="space-y-4">
  <li onClick={() => setPage("dashboard")} className="hover:bg-gray-800 p-2 rounded cursor-pointer">
    📊 Dashboard
  </li>

  <li onClick={() => setPage("transactions")} className="hover:bg-gray-800 p-2 rounded cursor-pointer">
    💳 Transactions
  </li>

  <li onClick={() => setPage("insights")} className="hover:bg-gray-800 p-2 rounded cursor-pointer">
    📈 Insights
  </li>
</ul>
        </div>

        <p className="text-sm text-gray-400">v1.0</p>
      </div>

      {/* Main Section */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        
        {/* Header */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          {/* SINGLE ROLE DROPDOWN (CORRECT PLACE) */}
          <select
            className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;