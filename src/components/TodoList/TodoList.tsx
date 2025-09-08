import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Task from "@/components/Task/Task";
import { useModalStore } from "@/store/useModalStore";
import { useStorage } from "@/store/useStorage";
import modalStyles from "@/components/Modal/index.module.scss";
import { methods, type TaskType } from "@/store/useStorage";

const priorityValues = {
  low: 1,
  medium: 2,
  high: 3,
};

const TodoList: React.FC = () => {
  const tasks = useStorage((state) => state.tasks);
  const setModalActive = useModalStore((state) => state.setModalActive);

  const [filterInputValue, setFilterInputValue] = useState("");
  const [visibleTasks, setVisibleTasks] = useState<TaskType[]>([]);
  const [sortMethod, setSortMethod] = useState<methods>('byDate');

  useEffect(() => {
    const filteredTasks = tasks.filter((task) =>
      task.title.includes(filterInputValue)
    );

    switch (sortMethod) {
      case "byPriority": {
        setVisibleTasks(
          filteredTasks.sort((a, b) => {
            const firstPriorityValue = priorityValues[a.priority];
            const secontPriorityValue = priorityValues[b.priority];

            if (firstPriorityValue > secontPriorityValue) return -1;
            if (firstPriorityValue < secontPriorityValue) return 1;
            return 0;
          })
        );
        break;
      }
      case "byDate": {
        setVisibleTasks(
          filteredTasks.sort((a, b) => {
            return Number(b.id) - Number(a.id);
          })
        );
        break;
      }
    }
  }, [tasks, sortMethod, filterInputValue]);

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
        <div className={styles.controls}>
          <input
            type="text"
            className={modalStyles.input}
            placeholder="Find task..."
            value={filterInputValue}
            onChange={(e) => setFilterInputValue(e.target.value)}
          />
          <button
            type="button"
            className={styles.filterButton}
            onClick={() => {
              switch (sortMethod) {
                case "byDate":
                  setSortMethod("byPriority");
                  break;
                case "byPriority":
                  setSortMethod("byDate");
              }
            }}
          >
            Sort by: {sortMethod === "byDate" ? "date" : "priority"}
          </button>
        </div>
        {visibleTasks.length ? (
          <>
            {visibleTasks.map((task) => (
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
