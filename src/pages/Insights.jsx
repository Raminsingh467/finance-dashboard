import React from "react";
import { useApp } from "../context/AppContext";

const Insights = () => {
  const { transactions } = useApp();

  // Filter expenses
  const expenses = transactions.filter((t) => t.type === "expense");

  // Category totals
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Highest category
  const highestCategoryEntry = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const highestCategory = highestCategoryEntry
    ? highestCategoryEntry[0]
    : "N/A";

  // Total expense
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Highest Category Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">
            Highest Spending Category
          </h3>

          <p className="text-2xl font-bold mt-2 dark:text-white">
            {highestCategory}
          </p>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-gray-500 dark:text-gray-300 text-sm">
            Total Expense
          </h3>

          <p className="text-2xl font-bold mt-2 text-red-500">
            ₹{totalExpense}
          </p>
        </div>

      </div>

      {/* Optional insight message */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition">
        <p className="text-gray-600 dark:text-gray-300">
          You are spending most on{" "}
          <span className="font-semibold text-blue-500">
            {highestCategory}
          </span>
          . Try to optimize this category for better savings.
        </p>
      </div>

    </div>
  );
};

export default Insights;