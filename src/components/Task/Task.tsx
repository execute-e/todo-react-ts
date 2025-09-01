import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import { useStore, type Priority } from "../../store/useStore";
import { useEditTask } from "../../store/useEditTask";
import { priorityDefaultValue } from "@/components/Modal/Modal";
import { capitalize, isPriority } from "@/utils";

type TaskProps = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
};

const Task: React.FC<TaskProps> = ({ id, title, description, priority }) => {
  const doneTask = useStore((state) => state.removeTask);
  const editTask = useStore((state) => state.editTask);
  const currentEditedTaskID = useEditTask((state) => state.currentEditedTaskID);
  const updateID = useEditTask((state) => state.updateID);

  const [titleValue, setTitleValue] = useState(title);
  const [descValue, setDescValue] = useState(description);
  const [priorityValue, setPriorityValue] = useState(priority);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentEditedTaskID === id) {
      titleInputRef?.current?.focus();
    }
  }, [currentEditedTaskID, id]);

  useEffect(() => {
    setTitleValue(title);
    setDescValue(description);
  }, [currentEditedTaskID, title, description]);

  return (
    <div className={styles.task}>
      <button
        type="button"
        className={styles.taskButtonDone}
        aria-label="Confirm task"
        onClick={() => {
          doneTask(id);
        }}
        disabled={currentEditedTaskID === id}
      />
      {currentEditedTaskID === id ? (
        <>
          <div className={styles.taskInputs}>
            <input
              type="text"
              className={styles.taskTitleInput}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              ref={titleInputRef}
              spellCheck="false"
              minLength={1}
              maxLength={55}
            />
            <hr className={styles.hr} />
            <input
              type="text"
              className={styles.taskDescriptionInput}
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
              ref={descInputRef}
              spellCheck="false"
              minLength={1}
              maxLength={100}
            />
            <hr className={styles.hr} />
            <select
              name="priority"
              className={styles.select}
              defaultValue={priorityDefaultValue}
              value={priorityValue}
              onChange={(e) => {
                if (isPriority(e.target.value)) {
                  setPriorityValue(e.target.value)
                }
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="button"
            className={styles.taskButtonDone + " " + styles.taskButtonDoneEdit}
            aria-label="Confirm edit"
            onClick={() => {
              if (titleValue.length > 0) {
                editTask(id, titleValue, descValue || "", priorityValue);
              }
              updateID("");
            }}
          />
        </>
      ) : (
        <>
          <div className={styles.taskGroup}>
            <h2 className={styles.taskTitle}>{title}</h2>
            <hr className={styles.hr} />
            <p className={styles.taskDescription}>{description ? description : 'No description'}</p>
            <hr className={styles.hr} />
            <p className={styles.priority}>{priority ? capitalize(priority) : 'Low'} priority</p>
          </div>
          <button
            className={styles.taskButtonEdit}
            type="button"
            aria-label="Edit task"
            onClick={() => {
              updateID(id);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Task;
