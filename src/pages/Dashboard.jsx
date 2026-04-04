import React from "react";
import { useApp } from "../context/AppContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {

  const { transactions } = useApp();

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Line chart data
  const chartData = transactions.map((t, index) => ({
    name: `Day ${index + 1}`,
    amount: t.amount
  }));

  // Pie chart data
  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        acc[curr.category] = acc[curr.category] || {
          name: curr.category,
          value: 0
        };
        acc[curr.category].value += curr.amount;
      }
      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Custom Tooltip 
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow">
          <p className="text-sm dark:text-white">
            {payload[0].name}: ₹{payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">💰 Total Balance</h3>
          <p className="text-3xl font-bold mt-2 dark:text-white">₹{balance}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">📈 Income</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">₹{totalIncome}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">📉 Expenses</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">₹{totalExpense}</p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="mb-2 font-semibold dark:text-white">Balance Trend</h3>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip /> {/* default tooltip OK */}
                <Line type="monotone" dataKey="amount" stroke="#6366f1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="mb-2 font-semibold dark:text-white">Expense Breakdown</h3>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                
                {/* CUSTOM TOOLTIP USED */}
                <Tooltip content={<CustomTooltip />} />

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;