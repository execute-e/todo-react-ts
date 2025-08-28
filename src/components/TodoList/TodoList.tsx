import React, { useState } from "react";
import styles from "./index.module.scss";
import { useStore } from "../../store/useStore";
import Task from "../Task/Task";

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const activeTasks = useStore((state) => state.tasks);
  const addActiveTask = useStore((state) => state.createTask);
  //const removeActiveTask = useActiveStore(state => state.removeTask);

  return (
    <div className={styles.todo}>
      <header className={styles.todoHeader}>
        <div className={styles.todoOverlay}>
        <input
          type="text"
          className={styles.todoInput}
          placeholder="Type text here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={55}
          spellCheck="false"
        />
        <button
          type="button"
          className={styles.todoButtonAdd}
          onClick={() => {
            if (inputValue) {
              addActiveTask(String(Date.now()), inputValue);
              setInputValue("");
            }
          }}
          aria-label="Add task"
        />
        </div>
      </header>
      <section className={styles.todoContent}>
        {activeTasks.length ? 
        <>
        {activeTasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
        </>
        :
        <h2>There is no tasks yet</h2>
        }
      </section>
    </div>
  );
};

export default TodoList;
