# Design & Print – Custom Print Ordering Platform

Design & Print is a full-stack custom print ordering platform that allows users to upload print files, browse products, place custom orders, and track order progress in real time. The application is built using the MERN stack with a modular architecture focused on scalability, maintainability, and user experience.

The platform includes secure authentication, order management, product browsing, cart functionality, email automation, and dynamic order tracking.

---

## Features

* JWT-based User Authentication
* Product Catalog with Category Filtering
* Cart Management for Logged-in Users
* Custom Print Order Placement
* Real-Time Order Status Tracking
* Order History with Detailed View
* Contact Form with Automated Email Responses
* File Upload Support with Database Storage
* Responsive User Interface with Smooth Animations
* REST API-based Backend Architecture

---

## Contact & Notification System

The platform includes an integrated contact system where:

* User queries are stored in MongoDB
* Automated confirmation emails are sent using Nodemailer
* Gmail SMTP integration is used for email delivery
* Success feedback is displayed after submission

---

## Tech Stack

| Layer          | Technologies                   |
| -------------- | ------------------------------ |
| Frontend       | React.js, Axios, Framer Motion |
| Backend        | Node.js, Express.js            |
| Database       | MongoDB, Mongoose              |
| Authentication | JWT Authentication             |
| Mailing        | Nodemailer (Gmail SMTP)        |
| Tools          | Git, GitHub, VS Code, Postman  |

---

## Project Structure

```bash
design-n-print/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── jobs/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── server.js
│   └── .env.example
│
├── public/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── images/
│   ├── pages/
│   ├── styles/
│   └── App.js
│
├── .gitignore
├── LICENSE
├── LOGO_LICENSE.txt
├── package.json
├── package-lock.json
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Nayan172005/design-n-print.git
cd design-n-print
```

---

### Configure Environment Variables

Navigate to the backend directory and create a `.env` file using the example template:

```bash
cp backend/.env.example backend/.env
```

Configure the required credentials:

* MongoDB Connection URI
* JWT Secret
* Email Credentials

---

### Install Dependencies

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

---

### Run the Application

Start backend server:

```bash
cd backend
npm run dev
```

Start frontend application:

```bash
npm start
```

---

## Default Ports

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

---

## Author

Nayan Sharma

GitHub: https://github.com/Nayan172005

---

## License

This project is licensed under the MIT License.

---

## Logo Usage Policy

The Design & Print logo is a proprietary asset owned by Nayan Sharma.

The logo may not be reused, modified, redistributed, or reproduced without explicit permission from the owner.
