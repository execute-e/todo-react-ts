import React from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Modal from "./components/Modal/Modal";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="mainContainer">
        <TodoList />
        <Modal />
      </main>
    </>
  );
};

export default App;
