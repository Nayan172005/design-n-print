# 🖨️ Design & Print – Custom Print Ordering Platform (In Progress)

**Design & Print** is a full-stack web application that enables users to upload custom print files, place print orders, and track their progress in real-time. Built with a clean modular structure using **React**, **Node.js**, **Express**, and **MongoDB**, this system is under active development with secure authentication and admin functionality planned.

---

## 🚧 Project Status

> This project is currently a work in progress.  
> Key backend APIs and frontend structure are in place. More features like payment gateway and admin dashboard are being built.

---

## 🎯 Features (Planned & Partially Done)

- ✅ User registration and login (JWT-based)
- ✅ File upload for custom print designs
- ✅ Order placement and tracking
- ✅ MongoDB-backed product and order models
- 🔒 Admin dashboard for managing orders, users, and inventory
- 💳 Payment gateway integration (Planned)
- 📦 File storage and download (uploads folder, Git-ignored)

---

## 🛠️ Tech Stack

| Layer      | Tools                             |
|------------|-----------------------------------|
| Frontend   | React.js, JSX, CSS Modules        |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB, Mongoose                 |
| Auth       | JWT-based Authentication          |
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
│ ├── utils/                    # Helper functions
│ └── server.js                 # Entry point for backend
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

---

## 🧑‍💻 Author

[Nayan Sharma](https://github.com/Nayan172005)

---

### ⚠️ Logo Usage Policy

The **Design N Print** logo is a proprietary asset owned by Nayan Sharma.  
It is **not licensed for reuse, redistribution, or modification**.  
Unauthorized usage in any form is strictly prohibited.
