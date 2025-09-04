import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type Task } from "./useStore";
import { createJSONStorage } from "zustand/middleware";
import { store } from "@/store/useStore";

export type Priority = "low" | "medium" | "high";

type useStorage = {
  tasks: Task[];
  createTask: (
    id: string,
    title: string,
    description: string,
    priority: Priority
  ) => void;
  removeTask: (id: string) => void;
  editTask: (
    id: string,
    title: string,
    description: string,
    priority: Priority
  ) => void;
};

export const storage = create<useStorage>()(
  persist(
    devtools((set, get) => ({
      tasks: [],
      createTask: (id, title, description, priority) => {
        const { tasks } = get();

        const newTasks = [{ id, title, description, priority }, ...tasks];
        set({ tasks: newTasks });

        const { updateTasks } = store.getState(); // Updating the visible copies of tasks
        updateTasks(newTasks);
      },
      removeTask: (id) => {
        const { tasks } = get();

        const newTasks = tasks.filter((task) => task.id !== id);
        set({
          tasks: newTasks,
        });

        const { updateTasks } = store.getState(); // Updating the visible copies of tasks
        updateTasks(newTasks);
      },
      editTask: (id, title, description, priority) => {
        const { tasks } = get();

        const newTasks = tasks.map((task) => ({
          ...task,
          title: task.id !== id ? task.title : title,
          description: task.id !== id ? task.description : description,
          priority: task.id !== id ? task.priority : priority,
        }));
        set({
          tasks: newTasks,
        });

        const { updateTasks } = store.getState(); // Updating the visible copies of tasks
        updateTasks(newTasks);
      },
    })),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useStorage = storage;