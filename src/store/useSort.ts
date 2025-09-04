import { create } from "zustand";
import { methods } from "./useStore";

type useSort = {
    sortMethod: methods;
    setSortMethod: (sortMethod: methods) => void;
}

export const useSort = create<useSort>()((set) => ({
    sortMethod: 'byPriority',
    setSortMethod: (sortMethod) => {
        set({
            sortMethod,
        })
    }
}))