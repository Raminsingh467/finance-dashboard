# Finance Dashboard UI

## Overview
This project is a responsive and interactive **Finance Dashboard** built as part of a Frontend Developer Intern assignment.
The application allows users to track financial activities, visualize spending patterns, and manage transactions through an intuitive and clean user interface.
The focus of this project is on frontend architecture, UI/UX design, and state management without relying on a backend.



## Features

### Dashboard Overview
- Displays key financial metrics:
  - Total Balance
  - Total Income
  - Total Expenses
- Line Chart: Shows transaction trend over time
- Pie Chart: Displays expense breakdown by category (with hover tooltips)


### Transactions Management
- View all transactions with:
  - Date
  - Category
  - Amount
  - Type (Income / Expense)
- Search transactions by category
- Filter by type (Income / Expense)
- Sort by latest or amount
- Add new transactions (Admin only)
- Delete transactions (Admin only)
- Export transactions as CSV


### Role-Based UI
- **Viewer**
  - Can only view data
- **Admin**
  - Can add and delete transactions
- Role can be switched using dropdown (simulated RBAC)


### Insights Section
- Displays key insights such as:
  - Highest spending category
  - Total expenses
- Provides a simple observation to help users understand spending behavior


## Additional Enhancements
- Dark / Light mode toggle with persistence
- Data persistence using Local Storage
- Smooth animations and transitions
- Fully responsive design (mobile + desktop)
- Interactive charts using Recharts


## State Management
- Implemented using **React Context API**
- Centralized state includes:
  - Transactions data
  - User role
  - Dark mode state
- Ensures clean and scalable state handling


## Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts
- Context API
- Local Storage



## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/raminsingh467/finance-dashboard.git
cd finance-dashboard
