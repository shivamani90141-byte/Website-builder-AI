# 🚀 AI Website Builder

> 🤖 Build complete React websites using AI — from a simple natural-language prompt to a fully generated, editable project.

An AI-powered full-stack website builder built with the **MERN stack**. Users can describe the website they want, and the application uses AI to plan the project, generate files, preview the website, make AI-assisted revisions, and publish the finished project.

---

## ✨ Features

### 🤖 AI-Powered Website Generation

Describe your website in natural language and let AI generate the project structure and source code.

Example:

> "Create a modern SaaS landing page for an AI productivity platform with a navbar, hero section, features, pricing, testimonials and footer."

The AI can generate:

- 📁 Project structure
- ⚛️ React components
- 🎨 CSS / styling
- 🧩 Reusable UI components
- 📄 Supporting project files
- 🔗 Component imports
- 📝 Project description

---

### 🧠 AI Project Planning

Before generating the code, the AI creates a project plan containing:

- 📂 Files to be created
- 📄 File descriptions
- 🔗 Expected imports
- 📦 Project name
- 📝 Project description

This makes the generation process more structured instead of blindly generating one large block of code.

---

### 💬 AI Code Revision

Users can continue chatting with the AI after the initial generation.

For example:

> "Make the hero section more modern."

> "Change the navbar to a dark theme."

> "Add a testimonials section."

> "Make the website responsive."

The AI analyzes the existing project files and generates targeted file operations such as:

- ➕ Create files
- ✏️ Update files
- 🗑️ Delete files

---

### 🖥️ Live Website Preview

Generated projects can be previewed directly inside the application.

Users can:

- 👀 View the generated website
- 📂 Explore project files
- ✏️ Edit source code
- 🔄 See changes reflected in the preview

---

### 📁 File Explorer

The builder includes a project file explorer for navigating generated files.

Example:

```text
📦 Project
 ├── 📄 App.js
 ├── 📄 styles.css
 ├── 📁 components
 │   ├── 📄 Navbar.js
 │   ├── 📄 Hero.js
 │   ├── 📄 Features.js
 │   └── 📄 Footer.js
 └── 📁 public
     └── 📄 index.html
