import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const Transactions = () => {
  const { transactions, role, setTransactions } = useApp();
  const handleDelete = (id) => {
  setTransactions((prev) => prev.filter((t) => t.id !== id));
};

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const [newTx, setNewTx] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  // ➕ Add Transaction
  const handleAdd = () => {
    if (!newTx.date || !newTx.category || !newTx.amount) return;

    setTransactions((prev) => [
      ...prev,
      {
        ...newTx,
        id: Date.now(),
        amount: Number(newTx.amount),
      },
    ]);

    setNewTx({ date: "", category: "", amount: "", type: "expense" });
  };

  // Export CSV
  const exportCSV = () => {
    const csv = [
      ["Date", "Category", "Amount", "Type"],
      ...transactions.map((t) => [
        t.date,
        t.category,
        t.amount,
        t.type,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

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
    if (sort === "latest") return new Date(b.date) - new Date(a.date);
    if (sort === "amount") return b.amount - a.amount;
    return 0;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      {/* Admin Section */}
      {role === "admin" && (
        <div className="mb-6 space-y-3">

          {/* Add Form */}
          <div className="flex flex-wrap gap-2">

            <input
              type="date"
              value={newTx.date}
              onChange={(e) =>
                setNewTx({ ...newTx, date: e.target.value })
              }
              className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Category"
              value={newTx.category}
              onChange={(e) =>
                setNewTx({ ...newTx, category: e.target.value })
              }
              className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              placeholder="Amount"
              value={newTx.amount}
              onChange={(e) =>
                setNewTx({ ...newTx, amount: e.target.value })
              }
              className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={newTx.type}
              onChange={(e) =>
                setNewTx({ ...newTx, type: e.target.value })
              }
              className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              type="button" 
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 rounded hover:scale-105 transition"
            >
              Add
            </button>
          </div>

          {/* Export */}
          <button
            onClick={exportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition"
          >
            Export CSV
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        >
          <option value="latest">Latest</option>
          <option value="amount">Amount</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md overflow-x-auto transition">
        <table className="w-full text-left">

          <thead>
            <tr className="border-b text-gray-600 dark:text-gray-300">
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
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
                  {/* DELETE BUTTON */}
  {role === "admin" && (
    <td>
      <button
        onClick={() => handleDelete(t.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition"
      >
        Delete
      </button>
    </td>
  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? "5" : "4"} className="text-center py-4 text-gray-500">
                  No transactions found 
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