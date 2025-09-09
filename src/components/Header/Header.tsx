import React from "react";
import styles from "./index.module.scss";
import { useTheme } from "@/store/useTheme";

const Header: React.FC = () => {
  const theme = useTheme((state) => state.theme);
  const changeTheme = useTheme((state) => state.changeTheme);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Todo List</h1>
      <button
        type="button"
        className={styles.themeButton}
        onClick={() => {
          if (theme === 'light') {
            changeTheme('dark');
          } else {
            changeTheme('light');
          }
        }}
      >
        {theme === 'light' ? <i className="icon-sun"></i> : <i className="icon-moon"></i>}
      </button>
    </header>
  );
};

export default Header;
