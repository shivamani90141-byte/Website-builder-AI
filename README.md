# 🚀 AI Website Builder

<p align="center">
  <strong>🤖 Build complete React websites using AI</strong>
</p>

<p align="center">
  Describe your idea → Let AI generate the project → Edit → Preview → Publish 🚀
</p>

<p align="center">

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![AI](https://img.shields.io/badge/AI-OpenRouter-7C3AED?style=for-the-badge)

</p>

---

## 📌 Overview

**AI Website Builder** is a full-stack AI-powered website generation platform built using the **MERN stack**.

Instead of manually creating a website from scratch, users can describe what they want using natural language. The application uses AI to understand the request, create a project plan, generate the required React files, validate the generated code, and display the result in a live preview.

Users can then continue interacting with the AI to modify and improve the generated website.

### 💡 Example

A user can enter:

> Create a modern portfolio website for a software engineer with a dark theme, hero section, skills, projects, experience, contact form and footer.

The AI generates the project structure and source code automatically.

---

# ✨ Features

## 🤖 AI-Powered Website Generation

Describe your website in natural language and let AI generate the project structure and source code.

The AI can generate:

- 📁 Project structure
- ⚛️ React components
- 🎨 CSS / styling
- 🧩 Reusable UI components
- 📄 Supporting project files
- 🔗 Component imports
- 📝 Project metadata

---

## 🧠 AI Project Planning

Before generating the code, the AI creates a structured project plan containing:

- 📂 Files to be created
- 📄 File descriptions
- 🔗 Expected imports
- 📦 Project name
- 📝 Project description

Example:

```text
📦 Project
├── 📄 App.js
├── 📄 styles.css
└── 📁 components
    ├── 📄 Navbar.js
    ├── 📄 Hero.js
    ├── 📄 Features.js
    ├── 📄 Testimonials.js
    └── 📄 Footer.js
```
### 🛠️ Tech Stack
🎨 Frontend
| Technology      | Purpose             |
| --------------- | ------------------- |
| ⚛️ React        | User interface      |
| ⚡ Vite          | Frontend tooling    |
| 🎨 Tailwind CSS | Styling             |
| 🧭 React Router | Client-side routing |
| 📦 Axios        | API communication   |
| 🧩 Lucide React | UI icons            |
| 🖥️ Sandpack    | Live code preview   |

⚙️ Backend
| Technology       | Purpose               |
| ---------------- | --------------------- |
| 🟢 Node.js       | JavaScript runtime    |
| 🚂 Express.js    | REST API              |
| 🍃 MongoDB       | Database              |
| 🦫 Mongoose      | MongoDB ODM           |
| 🔐 JWT           | Authentication        |
| 🔒 bcrypt        | Password hashing      |
| 🍪 Cookie Parser | Cookie handling       |
| 🌐 CORS          | Cross-origin requests |

🤖 AI Layer
| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| 🧠 OpenRouter   | AI model access              |
| ⚡ Vercel AI SDK | AI integration               |
| 📐 Zod          | Structured output validation |
| 🔄 p-map        | Concurrent file generation   |

🧠 AI Generation Pipeline

                 👤 USER PROMPT
                       │
                       ▼
               🧠 AI PROJECT PLANNER
                       │
                       ▼
                  📋 FILE PLAN
                       │
                       ▼
                ⚡ FILE GENERATION
                       │
                       ▼
              🧹 CONTENT NORMALIZER
                       │
                       ▼
                🔍 CODE VALIDATOR
                       │
                       ▼
                    💾 MONGODB
                       │
                       ▼
                 🖥️ LIVE PREVIEW
                 
🧠AI Generation Pipeline

              👤 USER REQUEST
                     │
                     ▼
              📂 CURRENT FILES
                     │
                     ▼
             🧠 AI REVISION ENGINE
                     │
                     ▼
              📐 FILE OPERATIONS
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       ➕ CREATE   ✏️ UPDATE   🗑️ DELETE
          │          │          │
          └──────────┼──────────┘
                     ▼
                🔍 VALIDATION
                     │
                     ▼
                💾 SAVE FILES
                     │
                     ▼
                🖥️ PREVIEW
🏗️ Architecture

                         👤 USER
                           │
                           ▼
                ┌─────────────────────┐
                │   ⚛️ React + Vite   │
                │      Frontend       │
                └──────────┬──────────┘
                           │
                      REST API
                           │
                           ▼
                ┌─────────────────────┐
                │   🚂 Express API    │
                │      Backend        │
                └──────┬────────┬─────┘
                       │        │
              ┌────────┘        └────────┐
              ▼                          ▼
       ┌─────────────────┐       ┌─────────────────┐
       │ 🍃 MongoDB      │       │ 🤖 AI Service  │
       │                 │       │                 │
       │ Users           │       │ OpenRouter      │
       │ Projects        │       │ AI SDK          │
       │ Files           │       │ Zod             │
       │ Messages        │       │ Validation      │
       └─────────────────┘       └────────┬────────┘
                                          │
                                          ▼
                                ┌─────────────────┐
                                │ ⚛️ Generated    │
                                │ React Project   │
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │ 🖥️ Live Preview │
                                └─────────────────┘

