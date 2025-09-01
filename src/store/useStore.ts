import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
};

export type Priority = 'low' | 'medium' | 'high';

type TasksStore = {
  tasks: Task[];
  createTask: (id: string, title: string, description: string, priority: Priority) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string, description: string, priority: Priority) => void;
};

export const useStore = create<TasksStore>()(
  persist(
    devtools((set, get) => ({
      tasks: [],
      createTask: (id, title, description, priority) => {
        const { tasks } = get();

        set({
          tasks: [{ id, title, description, priority }, ...tasks],
        });
      },
      removeTask: (id) => {
        const { tasks } = get();

        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },
      editTask: (id, title, description, priority) => {
        const { tasks } = get();

        set({
          tasks: tasks.map((task) => ({
            ...task,
            title: task.id !== id ? task.title : title,
            description: task.id !== id ? task.description : description,
            priority: task.id !== id ? task.priority : priority,
          })),
        });
      },
    })),
    {
      name: "tasks-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
