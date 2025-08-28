import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import { useStore } from "../../store/useStore";

type TaskProps = {
  id: string;
  title: string;
};

const Task: React.FC<TaskProps> = ({ id, title }) => {
  const doneTask = useStore(state => state.removeTask);
  const editTask = useStore(state => state.editTask)
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
        if (isEditMode) {
            titleInputRef?.current?.focus()
        }
  }, [isEditMode])

  return (
    <div className={styles.task}>
          <button
            type="button"
            className={styles.taskButtonDone}
            aria-label="Confirm task"
            onClick={() => {
                doneTask(id);
            }}
            disabled={isEditMode}
          />
          {isEditMode ? 
            <>
            <input 
              type="text"
              className={styles.taskTitleInput}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={titleInputRef}
              spellCheck="false"
              minLength={1}
              maxLength={55}
            />
            <button
            type="button"
            className={styles.taskButtonDone + " " + styles.taskButtonDoneEdit}
            aria-label="Confirm edit"
            onClick={() => {
              if (value.length > 0) {
                editTask(id, value);
              }
              setEditMode(false);
            }}
            />
            </>
            :
            <>
            <h2 className={styles.taskTitle}>{title}</h2>
            <button
              className={styles.taskButtonEdit}
              type="button"
              aria-label="Edit task"
              onClick={() => {
                setEditMode(true);
              }}
            />
            </>
          }
    </div>
  );
};

export default Task;
