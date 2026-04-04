import React, { useState } from "react";
import { useApp } from "../context/AppContext"; // ✅ ADD THIS

const Transactions = () => {
  const { transactions, role } = useApp(); // ✅ FIXED (single line)

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  // Filter + Search
  const filteredData = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || t.type === filter;

    return matchesSearch && matchesFilter;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === "latest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sort === "amount") {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      {/* ✅ MOVE BUTTON INSIDE JSX */}
      {role === "admin" && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          + Add Transaction
        </button>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">

        <input
          type="text"
          placeholder="Search category..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="amount">Amount</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">

          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{t.date}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount}</td>
                  <td
                    className={
                      t.type === "income"
                        ? "text-green-600 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {t.type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No transactions found 😕
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Transactions;