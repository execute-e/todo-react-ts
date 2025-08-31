import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useStore } from "../../store/useStore";
import { useModalStore } from "../../store/useModalStore";

const Modal: React.FC = () => {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descInputValue, setDescInputValue] = useState("");

  const addActiveTask = useStore((state) => state.createTask);
  const isModalActive = useModalStore((state) => state.isModalActive);
  const setModalActive = useModalStore((state) => state.setModalActive);

  const modal = useRef<HTMLDialogElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInputValue.trim()) {
      addActiveTask(String(Date.now()), titleInputValue, descInputValue);
      setTitleInputValue("");
      setDescInputValue("");
      setModalActive(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      setModalActive(false);
    }
  };

  useEffect(() => {
    if (isModalActive) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [isModalActive, modal]);

  return (
    <dialog className={styles.modal} ref={modal} onClick={handleClick}>
      <div className={styles.modalInner}>
        <button
          type="button"
          aria-label="Close modal"
          className={styles.closeModal}
          onClick={() => setModalActive(false)}
        >
          <i className="icon-cancel"></i>
        </button>
        <form
          className={styles.header}
          aria-label="Add new task"
          onSubmit={handleSubmit}
        >
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Task details</legend>

            <div className={styles.group}>
              <label className={styles.label} htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className={styles.input}
                placeholder="Type title here..."
                value={titleInputValue}
                onChange={(e) => setTitleInputValue(e.target.value)}
                maxLength={55}
                spellCheck="false"
              />
            </div>

            <div className={styles.group}>
              <label className={styles.label} htmlFor="description">
                Description:
              </label>
              <input
                type="text"
                id="description"
                className={styles.input}
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
            className="myBtn"
            aria-label="Add new task"
            disabled={!titleInputValue.trim()}
          >
            Add task
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
