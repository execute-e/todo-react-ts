import React, { useState } from "react";
import styles from "./index.module.scss";
import { useStore } from "../../store/useStore";
import Task from "../Task/Task";

const TodoList: React.FC = () => {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descInputValue, setDescInputValue] = useState("");

  const activeTasks = useStore((state) => state.tasks);
  const addActiveTask = useStore((state) => state.createTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInputValue.trim()) {
      addActiveTask(String(Date.now()), titleInputValue, descInputValue)
      setTitleInputValue("");
      setDescInputValue("");
    }
  }

  return (
    <div className={styles.todo}>
      <form
        className={styles.todoHeader}
        aria-label="Add new task"
        onSubmit={handleSubmit}
      >
        <fieldset className={styles.todoFieldset}>
          <legend className={styles.todoLegend}>Task details</legend>

          <div className={styles.todoGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className={styles.todoInput}
              placeholder="Type title here..."
              value={titleInputValue}
              onChange={(e) => setTitleInputValue(e.target.value)}
              maxLength={55}
              spellCheck="false"
            />
          </div>

          <div className={styles.todoGroup}>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              className={styles.todoInput}
              placeholder="Type description here..."
              value={descInputValue}
              onChange={(e) => setDescInputValue(e.target.value)}
              maxLength={100}
              spellCheck="false"
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className={styles.todoButtonAdd}
          aria-label="Add new task"
          disabled={!titleInputValue.trim()}
        >
          Add task
        </button>
      </form>
      <section className={styles.todoContent}>
        {activeTasks.length ? (
          <>
            {activeTasks.map((task) => (
              <Task key={task.id} id={task.id} title={task.title} description={task.description} />
            ))}
          </>
        ) : (
          <h2>There is no tasks yet</h2>
        )}
      </section>
    </div>
  );
};

export default TodoList;
