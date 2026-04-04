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

  // Safe highest category
  const highestCategoryEntry = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const highestCategory = highestCategoryEntry
    ? highestCategoryEntry[0]
    : "N/A";

  // Safe total expense
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Insights</h2>

      <div className="bg-white p-6 rounded-xl shadow-md">

        <p className="mb-3">
          💸 Highest Spending Category:
          <span className="font-bold ml-2">
            {highestCategory}
          </span>
        </p>

        <p>
          💰 Total Expense:
          <span className="font-bold ml-2">
            ₹{totalExpense}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Insights;