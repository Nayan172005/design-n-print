# 🖨️ Design & Print – Custom Print Ordering e-Commerce Platform 

**Design & Print** is a full-stack web application that enables users to upload custom print files, place print orders, and track their progress in real-time. Built with a clean modular structure using **React**, **Node.js**, **Express**, and **MongoDB**, this system is under active development with secure authentication, admin functionality, and payment integration in the pipeline.

---

## 🚧 Project Status

> This project is currently under active development.  
> Core features like cart system, custom order placement, contact form, and real-time order tracking are already functional. Further features like payments and moderation are in progress.

---

## 🎯 Features (Completed ✅ / Planned 🕐)

| Feature | Status |
|--------|--------|
| User Registration & Login (JWT) | ✅ Done |
| Product Catalog + Category Filter | ✅ Done |
| Add to Cart (Logged-in Users) | ✅ Done |
| Custom Order Placement | ✅ Done |
| Track Order Status (with live progress bar) | ✅ Done |
| View Past Orders with Detail Modal | ✅ Done |
| Contact Form with Email Auto-Response | ✅ Done |
| Moderator Dashboard for Products and Order Management | 🕐 Planned |
| Payment Gateway Integration | 🕐 Planned |
| File Storage (Uploads + MongoDB URL) | ✅ Done |

---

## 📩 Contact Form Feature

- Contact messages are saved in MongoDB.
- Auto-email reply is sent using Nodemailer + Gmail SMTP (App Password).
- Success animation after submission.

---

## 🛠️ Tech Stack

| Layer      | Tools                             |
|------------|-----------------------------------|
| Frontend   | React.js, Framer Motion, Axios    |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB, Mongoose                 |
| Auth       | JWT-based Authentication          |
| Mailing    | Nodemailer (Gmail SMTP)           |
| Tools      | Postman, VS Code, Git             |

---

## 🗂️ Folder Structure

```bash
design-n-print/
├── backend/
│ ├── config/                   # DB config
│ ├── controllers/              # Request handlers
│ ├── jobs/                     # Scheduled/cron jobs
│ ├── middleware/               # Auth, error handling
│ ├── models/                   # Mongoose schemas
│ ├── routes/                   # API routes
│ ├── scripts/                  # Utilities/scripts
│ ├── utils/                    # Helper functions (mailer, validators)
│ ├── server.js                 # Entry point for backend
│ └── .env.example # Example environment variables file
│
├── public/                     # Static frontend assets
│
├── src/
│ ├── api/                      # API call logic
│ ├── components/               # Reusable UI components
│ │ ├── auth/                   # Login/Register modals
│ │ └── ...                     # Navbar, Footer, Forms etc.
│ ├── images/                   # UI illustrations/images
│ ├── pages/                    # Page-level components
│ ├── styles/                   # CSS Modules
│ └── App.js                    # App entry
│
├── .gitignore
├── README.md
├── LICENSE                     #(MIT License for code)
├── LOGO_LICENSE.txt            #(Copyright restriction for logo)
├── package.json
└── package-lock.json
```
---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Nayan172005/design-n-print.git
cd design-n-print
```

### 2. Environment Variables
- Navigate to the `backend/` folder.
- Copy the example environment file:
```bash
cp backend/.env.example backend/.env
```
- Fill in your own credentials for:
  - MongoDB connection string
  - JWT secret
  - Email credentials (if used)

### 3. Install Dependencies
- Install frontend dependencies:
```bash
cd frontend
npm install
```

- Install backend dependencies:
```bash
cd ../backend
npm install
```

### 4. Run the Application
- Start backend server:
```bash
node server.js
```

- Start frontend React app (open a new terminal):
```bash
cd frontend
npm start
```

By default:
- Backend runs on **http://localhost:5000**
- Frontend runs on **http://localhost:3000**

---

## 🧑‍💻 Author

[Nayan Sharma](https://github.com/Nayan172005)

---

### ⚠️ Logo Usage Policy

The **Design N Print** logo is a proprietary asset owned by Nayan Sharma.  
It is **not licensed for reuse, redistribution, or modification**.  
Unauthorized usage in any form is strictly prohibited.
