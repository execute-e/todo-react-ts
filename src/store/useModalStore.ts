import { create } from "zustand";

type ModalStore = {
  isModalActive: boolean;
  setModalActive: (bool: boolean) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isModalActive: false,
  setModalActive: (bool) => {
    document.body.classList.toggle("lock");

    set({
      isModalActive: bool,
    });
  },
}));
