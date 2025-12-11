# LoanLink – Microloan Request & Approval Tracker System
Live Link =[https://loanlink-project.netlify.app/]
## Project Overview
LoanLink is a web-based microloan request, review, and approval management system designed to streamline microloan operations for small financial organizations, NGOs, and microloan providers. The system allows users to request loans, track their status, and enables managers and admins to review and approve applications efficiently.  

---

## Features

### General
- Modern, responsive UI with consistent design across all pages
- Dark/Light theme toggle
- Fully functional dashboard for Borrowers, Managers, and Admins
- Dynamic routing with private routes for secure pages
- Smooth animations using Framer Motion
- Real backend integration with MongoDB
- Toast notifications for all CRUD actions

### Home Page
- Hero Banner with call-to-action buttons (**Apply for Loan / Explore Loans**)  
- Available Loans section (6 loan cards from MongoDB)
- How It Works section (step-by-step)
- Customer Feedback carousel
- 2 extra relevant sections for additional information

### Authentication
- Login with email/password & optional Google/GitHub login
- Register page with role selection (Borrower/Manager)
- Password validation (uppercase, lowercase, min 6 characters)
- Toast notifications on login/register success or errors

### All Loans Page
- Display all loans in a 3-column grid layout
- Each card contains: image, title, short description, max loan limit
- "View Details" button redirects to Loan Details Page

### Loan Details Page
- Detailed loan information: image, title, description, category, interest, max limit, available EMI plans
- **Apply Now** button (for logged-in Borrowers only) redirects to Loan Application Form with auto-filled loan info

### Loan Application Form
- Auto-filled read-only fields: User Email, Loan Title, Interest Rate
- User input fields: First Name, Last Name, Contact Number, National ID/Passport Number, Income Source, Monthly Income, Loan Amount, Reason, Address, Extra Notes
- On submit:
  - Saves data to Loan Applications collection
  - Updates Borrower’s My Loans page
  - Updates Manager’s Pending Loans page
  - Default status: Pending, Application Fee: Unpaid

### Borrower Dashboard
- My Loans page: view, cancel (pending loans), pay (unpaid loans) functionality
- Profile page with user info and logout

### Manager Dashboard
- Add Loan
- Manage Loans
- Pending Applications
- Approved Applications
- Profile

### Admin Dashboard
- Manage Users: approve/suspend users with feedback
- All Loans: view, edit, delete, toggle Show on Home
- Loan Applications: view, filter, approve/reject

### Extra Features
- Loading spinner during API calls
- 404 Not Found page
- Dynamic page titles
- Responsive UI
- Optional: React-Confetti on successful loan application
- Optional: Export loans to CSV/PDF (for Admin/Manager)

---

## Deployment
- Ensure server is working perfectly on production (no CORS, 404, 504 errors)
- Domain added for Firebase authorization  Netlify
- Private routes do not redirect logged-in users to Login on reload
- Live site link should work without any errors

---

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, Framer Motion, React Router, React Query, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase / JWT
- **Payment Integration:** Stripe (for application fee)
- **Notifications:** react-hot-toast / SweetAlert

---

## Installation

### 
```bash
git clone <client-repo-url>
cd client
npm install
npm run dev
