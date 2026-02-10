# 🚀 ProjectFlow — MERN Project Management Tool

## 📌 Overview

**ProjectFlow** is a full-stack MERN (MongoDB, Express.js, React, Node.js) project management platform designed for team collaboration, task tracking, and workflow organization.
It enables users to create projects, manage tasks, collaborate in real time, upload files, and monitor project progress through analytics.

This project was developed as part of an internship assignment to demonstrate full-stack development, real-time communication, and modern UI implementation.

---

## ✨ Key Features

### 🔐 Authentication

* Secure user registration and login
* JWT-based authentication
* Protected routes

### 📁 Project Management

* Create and manage projects
* Invite team members via email
* Role-based collaboration

### ✅ Task Management

* Create, update, and track tasks
* Drag-and-drop Kanban board
* Task priorities, due dates, status tracking
* Comments on tasks

### 💬 Team Collaboration

* Real-time project chat
* Activity tracking
* Notification system

### 📎 File Management

* Upload and share project files
* Organized per project

### 📊 Analytics Dashboard

* Task progress statistics
* Completion tracking
* Team productivity insights

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router
* Axios
* Socket.IO client

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Socket.IO realtime communication
* Multer (file uploads)

---

## 📂 Project Folder Structure

```
CodeAlpha_ProjectManagementTool/
│
├── client/                     # Frontend (React)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── socket.js
│   │   └── App.jsx
│   └── package.json
│
├── server/                     # Backend (Node + Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── index.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/HardikPatil0/CodeAlpha_ProjectManagementTool.git
cd CodeAlpha_ProjectManagementTool
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm run start
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs typically on:

```
http://localhost:5173
```

---

## 🌐 API Base URL

```
http://localhost:5000/api
```

---

## 🔒 Environment Variables

Example `.env`:

```
PORT=5000
MONGO_URI=<MongoDB URI>
JWT_SECRET=<Secret Key>
```

Never commit `.env` to GitHub.

---

## 📸 Demo Features Checklist

✔ User Authentication
✔ Project Creation
✔ Task Board (Drag & Drop)
✔ Chat System
✔ Notifications
✔ File Upload
✔ Analytics Dashboard

---


## 👨‍💻 Author

**Hardik Patil**
Full-Stack Developer (MERN)
GitHub: [https://github.com/HardikPatil0](https://github.com/HardikPatil0)

---

## 📜 License

This project is for educational and internship demonstration purposes.

---

## ⭐ Final Note

This project demonstrates:

* Full-stack MERN development
* Real-time collaboration systems
* Secure authentication
* Modern UI/UX implementation
* Scalable backend architecture

It reflects practical industry-level web application development skills.
