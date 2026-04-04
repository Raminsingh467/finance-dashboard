import React from "react";
import { useApp } from "../context/AppContext"; // ✅ use context

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {

  const { transactions } = useApp(); // ✅ get dynamic data

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

  return (
    <div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-gray-500">Total Balance</h3>
          <p className="text-2xl font-bold">₹{balance}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-gray-500">Income</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalIncome}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-gray-500">Expenses</h3>
          <p className="text-2xl font-bold text-red-500">₹{totalExpense}</p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="mb-2 font-semibold">Balance Trend</h3>
          <LineChart width={300} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="mb-2 font-semibold">Expense Breakdown</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;