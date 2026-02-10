# 🎥 Real-Time Video Communication App (MERN + WebRTC)

A full-stack real-time video conferencing and collaboration platform built using the MERN stack with WebRTC and Socket.io.  
This project was developed as part of a Full Stack Development Internship.

---

## 🚀 Features

### 👥 Video Conferencing
- Multi-user video calling using WebRTC
- Real-time peer-to-peer communication
- Camera & microphone access

### 🖥 Screen Sharing
- Share entire screen with meeting participants
- Works in real-time using WebRTC track replacement

### 💬 Chat System
- Real-time messaging with Socket.io
- Sidebar chat panel for discussion

### 📂 File Sharing
- Upload files during meetings
- Shared files saved in session
- Participants can download anytime

### 🎨 Whiteboard Collaboration
- Real-time collaborative drawing
- Sync across all participants

### 🔐 Authentication
- User Registration/Login
- JWT authentication
- MongoDB user storage

### 🔗 Meeting Code System
- Create meeting code
- Join meetings via code
- Invite others easily

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Socket.io Client
- WebRTC APIs

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Socket.io

---

## 📁 Project Structure

project-root/
│
├── client/ # React Frontend
│ ├── src/pages
│ ├── components
│ └── App.jsx
│
├── server/ # Node Backend
│ ├── routes
│ ├── models
│ └── server.js



---

## ⚙️ Installation

### 1. Clone Repository


### 2. Install Backend

cd server
npm install
npm start


### 3. Install Frontend

cd client
npm install
npm run dev


---

## 🌐 Environment Variables

Create `.env` in server:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=secretkey


---

## 🔒 Security Note

WebRTC uses:

- DTLS encryption
- SRTP media protection

All video/audio streams are encrypted peer-to-peer.

---

## 📹 Demo Workflow

1. Register/Login
2. Create Meeting Code
3. Share code with others
4. Join meeting
5. Video call + chat + file share + whiteboard

---

## 📈 Internship Submission Info

- Full Stack Development Internship Project
- Task: Real-Time Communication App
- Technologies: MERN + WebRTC + Socket.io

---

## 👨‍💻 Author

Hardik Patil  
Full Stack Developer (MERN)

---

## ⭐ Future Improvements

- TURN server for production calls
- Meeting recording
- Better UI animations
- Mobile responsiveness
