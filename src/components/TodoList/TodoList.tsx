import React from "react";
import styles from "./index.module.scss";
import { useStore } from "../../store/useStore";
import Task from "../Task/Task";
import { useModalStore } from "../../store/useModalStore";
import { useSort } from "@/store/useSort";

const TodoList: React.FC = () => {
  const activeTasks = useStore((state) => state.tasks);
  const sortTasks = useStore((state) => state.sortTasks);

  const setModalActive = useModalStore((state) => state.setModalActive);

  const sortMethod = useSort((state) => state.sortMethod);
  const setSortMethod = useSort((state) => state.setSortMethod);

  return (
    <div className={styles.todo}>
      <button
        type="button"
        className="myBtn"
        onClick={() => setModalActive(true)}
      >
        Create task
      </button>
      <section className={styles.todoContent}>
        {activeTasks.length ? (
          <>
            <button
              type="button"
              className={styles.filterButton}
              onClick={() => {
                setSortMethod(sortTasks(sortMethod));
              }}
            >
              Sort by: {sortMethod === "byDate" ? "priority" : "date"}
            </button>
            {activeTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
              />
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
