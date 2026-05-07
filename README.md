# DocQueryAIFrontend

An AI-powered document assistant frontend built with **React + Vite** that allows users to upload documents, chat with AI, and get intelligent answers from PDFs, research papers, contracts, and other resources.

## 🚀 Features

* 📄 Upload PDF and document resources
* 🤖 AI-powered document question answering
* 💬 Real-time chat interface
* 📚 Sidebar for managing uploaded resources
* 🔐 Authentication system
* ☁️ Cloudinary file upload integration
* ✨ Modern animated UI with React
* ⚡ Fast frontend powered by Vite
* 📱 Responsive design

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Axios
* Tailwind CSS
* Framer Motion

## APIs & Services

* FastAPI Backend
* Cloudinary
* REST APIs

---

# 📂 Project Structure

```bash
src/
│
├── api/
│   ├── authService.js
│   ├── axios.js
│   ├── chatService.js
│   └── documentService.js
│
├── assets/
│
├── component/
│   ├── chat/
│   ├── sidebar/
│   └── upload/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── HomePage.jsx
│   ├── RegisterPage.jsx
│   └── loginPage.jsx
│
├── utils/
│   └── uploadToCloudinary.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Nikhi111/DocQueryAIFrontend.git
```

## 2️⃣ Navigate into the project

```bash
cd DocQueryAIFrontend
```

## 3️⃣ Install dependencies

```bash
npm install
```

## 4️⃣ Start the development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `src` directory.

```env
VITE_API_BASE_URL=your_backend_url
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

# 📸 Screenshots

Add your application screenshots here.

```bash
/assets/screenshots
```

---

# 🔗 Backend Repository

Backend repository:

```bash
https://github.com/Nikhi111/DocQueryAI
```

---

# ✨ Future Improvements

* Streaming AI responses
* Multi-document chat
* Voice interaction
* Markdown rendering
* Chat history persistence
* Drag and drop uploads
* Authentication with JWT
* Dark/Light theme toggle

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Nikhil Shinde**

* GitHub: [https://github.com/Nikhi111](https://github.com/Nikhi111)
