import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Task = {
    id: string;
    title: string;
}

export type TasksStore = {
    tasks: Task[];
    createTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    editTask: (id: string, title: string) => void;
}

export const useStore = create<TasksStore>()(persist(devtools(((set, get) => ({
    tasks: [],
    createTask: (id, title) => {
        const { tasks } = get();

        set({
            tasks: [
                {id: id, title: title},
                ...tasks
            ]
        })
    },
    removeTask: (id) => {
        const { tasks } = get();

        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
    editTask: (id, title) => {
        const { tasks } = get();

        set({
            tasks: tasks.map(task => ({
                ...task,
                title: task.id !== id ? task.title : title,
            }))
        })
    },
}))), {
    name: "tasks-data",
    storage: createJSONStorage(() => sessionStorage),
}));