import React from "react";
import styles from "./index.module.scss";
import { useStore } from "../../store/useStore";
import Task from "../Task/Task";
import { useModalStore } from "../../store/useModalStore";

const TodoList: React.FC = () => {
  const activeTasks = useStore((state) => state.tasks);
  const setModalActive = useModalStore((state) => state.setModalActive);

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
            {activeTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
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
