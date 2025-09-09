import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Modal from "./components/Modal/Modal";
import { useTheme } from "./store/useTheme";

const App: React.FC = () => {
  const theme = useTheme((state) => state.theme);
  const changeTheme = useTheme((state) => state.changeTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--bgc', 'white');
      root.style.setProperty('--color-text', '#1A1A1D');
    } else {
      root.style.setProperty('--bgc', '#1A1A1D');
      root.style.setProperty('--color-text', 'white');
    }
  }, [theme, changeTheme]);

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
