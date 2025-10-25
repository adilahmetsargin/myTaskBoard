import React from "react";
import Header from "../components/Header";
import AddTaskForm from "../components/AddTaskForm";
import FilterBar from "../components/FilterBar";
import TaskList from "../features/tasks/TaskList";

const Home: React.FC = () => {
  return (
    <div className="page-root">
      <div className="container">
        <Header />
        <main className="card">
          <AddTaskForm />
          <FilterBar />
          <TaskList />
        </main>
        <footer className="footer">
          <small>sargindev — focusFlow</small>
        </footer>
      </div>
    </div>
  );
};

export default Home;
