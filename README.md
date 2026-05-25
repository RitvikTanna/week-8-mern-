# Week 8 MERN Assignment

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application developed as part of Week 8 learning assignments. This project demonstrates frontend-backend integration, API handling, authentication flow, and database operations.

## 🚀 Features

- User Authentication
- Login System
- JWT Authentication
- Protected API Routes
- MongoDB Database Integration
- REST API Implementation
- React Frontend
- Express Backend
- State Management
- Error Handling
- Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs

### Database
- MongoDB Atlas

### Deployment
- Vercel

---

## 📂 Folder Structure

```bash
week-8-mern/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── APIS/
│   ├── models/
│   ├── middlewares/
│   ├── services/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

Clone repository

```bash
git clone https://github.com/RitvikTanna/week-8-mern-.git
```

Move into project folder

```bash
cd week-8-mern-
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

Backend `.env`

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=production
```

Frontend `.env`

```env
VITE_API_URL=
```

---

## API Endpoints

### Login

```http
POST /common-api/login
```

### Logout

```http
GET /common-api/logout
```

### Check Authentication

```http
GET /common-api/check-auth
```

### Change Password

```http
PUT /common-api/change-password
```

---

## 📸 Screenshots

Add project screenshots here.

---

## Future Improvements

- Password Reset Feature
- User Profile Management
- Better UI Design
- Email Verification
- Loading Skeletons

---

## 👨‍💻 Author

Ritvik Tanna

Engineering Student | MERN Developer | AI Enthusiast

---

## 📜 License

This project is developed for educational purposes.
