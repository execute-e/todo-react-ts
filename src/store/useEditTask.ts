import { create } from "zustand";
import { devtools } from "zustand/middleware";

type EditedTask = {
  currentEditedTaskID: string;
  updateID: (id: string) => void;
};

export const useEditTask = create<EditedTask>()(
  devtools((set) => ({
    currentEditedTaskId: "",
    updateID: (id) => {
      set({
        currentEditedTaskID: id,
      });
    },
  }))
);
