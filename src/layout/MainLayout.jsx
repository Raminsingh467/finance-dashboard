import React from "react";
import { useApp } from "../context/AppContext";

const MainLayout = ({ children, setPage }) => {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <div className="flex h-screen transition duration-300">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 dark:bg-black text-white p-6 hidden md:flex flex-col justify-between transition duration-300">
        <div>
          <h1 className="text-2xl font-bold mb-10">💰 Finance</h1>

          <ul className="space-y-4">
            <li
              onClick={() => setPage("dashboard")}
              className="hover:bg-gray-800 p-2 rounded cursor-pointer transition"
            >
              Dashboard
            </li>

            <li
              onClick={() => setPage("transactions")}
              className="hover:bg-gray-800 p-2 rounded cursor-pointer transition"
            >
              Transactions
            </li>

            <li
              onClick={() => setPage("insights")}
              className="hover:bg-gray-800 p-2 rounded cursor-pointer transition"
            >
              Insights
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-400">v1.0</p>
      </div>

      {/* Main Section */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-screen transition duration-300">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center transition duration-300">
          
          <h2 className="text-xl font-semibold dark:text-white">
            Dashboard
          </h2>

          <div className="flex items-center gap-3">

            {/*Dark Mode Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(prev => !prev)}
    className="sr-only peer"
  />

  {/* Track */}
  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-500 transition"></div>

  {/* Thumb */}
  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform peer-checked:translate-x-5"></div>
</label>

            {/* Role Switch */}
            <select
              className="border px-3 py-1 rounded-md bg-white text-black dark:bg-gray-700 dark:text-white transition"  // ✅ FIXED colors
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-black dark:text-white transition duration-300">
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;