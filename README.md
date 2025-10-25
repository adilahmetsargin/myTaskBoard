🧩 myTaskBoard

A modern Task Management Web App built with React, Vite, and TypeScript.
This app lets users create, edit, and track tasks in a clean and minimal UI.
Perfect for personal productivity or small team planning.

🚀 Tech Stack

React 18 + TypeScript

Vite — fast development environment

Redux Toolkit — global state management

React Router DOM — navigation

CSS Modules — scoped and clean styling

UUID — unique task IDs

🎨 Features

✅ Add new tasks
✅ Edit and delete existing tasks
✅ Mark tasks as completed
✅ Filter tasks (All / Active / Completed)
✅ Persistent data via localStorage
✅ Fully responsive design (mobile-first)

🧱 Project Structure

src/
├── components/
│   ├── Header.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── TaskItem.tsx
│
├── redux/
│   ├── store.ts
│   └── taskSlice.ts
│
├── pages/
│   ├── Home.tsx
│   └── About.tsx
│
├── App.tsx
├── main.tsx
└── index.css

⚙️ Installation & Setup

Clone the repo:

git clone https://github.com/adilahmetsargin/myTaskBoard.git

cd myTaskBoard


Install dependencies:

npm install


Start the project:

npm run dev

🧩 Components Overview

Component	Description
Header	Displays app title and navigation links
TaskForm	Handles new task creation
TaskList	Lists all tasks and filters them
TaskItem	Single task component with checkbox and edit/delete actions

🧠 State Management

All task data is managed with Redux Toolkit.
The app uses a single slice taskSlice.ts with reducers for:

addTask

toggleComplete

editTask

deleteTask

filterTasks

💾 Persistence

Tasks are stored in firebase, so refreshing the page won't lose data.

🧰 Future Improvements (TODO)

 Add dark mode 🌙
 Add subtasks support
 Add task due dates and reminders
 Add drag-and-drop for task ordering

🌐 Live Demo

https://aasmytaskboard.netlify.app/

👨‍💻 Author

Adil Ahmet Sargin

Frontend Developer

📍 Rochester Hills, MI

📧 adilahmetsargin@gmail.com

🔗 GitHub Profile

🪄 License

This project is open-source and available under the MIT License.
