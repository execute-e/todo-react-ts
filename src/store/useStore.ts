import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
};

export type Priority = 'low' | 'medium' | 'high';

const priorityValues = {
  low: 1,
  medium: 2,
  high: 3,
}

export type methods = 'byPriority' | 'byDate';

type TasksStore = {
  tasks: Task[];
  createTask: (id: string, title: string, description: string, priority: Priority) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string, description: string, priority: Priority) => void;
  sortTasks: (method: methods) => methods;
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
      sortTasks: (method: methods) => {
        const { tasks } = get();

        if (method === 'byPriority') {
          set({
            tasks: tasks.sort((a, b) => {
              const firstPriorityValue = priorityValues[a.priority];
              const secontPriorityValue = priorityValues[b.priority];

              if (firstPriorityValue > secontPriorityValue) return -1;
              if (firstPriorityValue < secontPriorityValue) return 1;
              return 0;
            })
          })
          return 'byDate';
        }

        if (method === 'byDate') {
          set({
            tasks: tasks.sort((a, b) => {
              return Number(b.id) - Number(a.id);
            })
          })
          return 'byPriority';
        }
      }
    })),
    {
      name: "tasks-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
