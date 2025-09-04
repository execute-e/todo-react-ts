import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Priority } from "./useStorage";
import { storage } from "./useStorage";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
};

const priorityValues = {
  low: 1,
  medium: 2,
  high: 3,
};

export type methods = "byPriority" | "byDate";

type VisibleTasksStore = {
  visibleTasks: Task[];
  updateTasks: (tasks: Task[]) => void;
  sortTasks: (method: methods) => methods;
};

// This store keeps visible copies of tasks (filtered, sorted)

export const store = create<VisibleTasksStore>()(
  devtools((set, get) => ({
    visibleTasks: storage.getState()?.tasks, // Receiving tasks from storage
    updateTasks: (tasks) => {
      set({
        visibleTasks: tasks,
      })
    },
    sortTasks: (method: methods) => {
      const { visibleTasks } = get();

      switch (method) {
        case "byPriority":
          set({
            visibleTasks: visibleTasks.sort((a, b) => {
              const firstPriorityValue = priorityValues[a.priority];
              const secontPriorityValue = priorityValues[b.priority];

              if (firstPriorityValue > secontPriorityValue) return -1;
              if (firstPriorityValue < secontPriorityValue) return 1;
              return 0;
            }),
          });
          return "byDate";
        case "byDate":
          set({
            visibleTasks: visibleTasks.sort((a, b) => {
              return Number(b.id) - Number(a.id);
            }),
          });
          return "byPriority";
      }
    },
  }))
);

export const useStore = store;