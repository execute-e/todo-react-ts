import { create } from "zustand";
import { methods } from "./useStore";
import { createJSONStorage, persist } from "zustand/middleware";

type useSort = {
    sortMethod: methods;
    setSortMethod: (sortMethod: methods) => void;
}

export const useSort = create<useSort>()(persist((set) => ({
    sortMethod: 'byPriority',
    setSortMethod: (sortMethod) => {
        set({
            sortMethod,
        })
    }
}), {
    name: 'todo-sort-method',
    storage: createJSONStorage(() => localStorage),
}))