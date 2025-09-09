import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Themes = 'light' | 'dark';

type ThemesType = {
    theme: Themes;
    changeTheme: (theme: Themes) => void;
}

export const useTheme = create<ThemesType>()(persist((set) => ({
    theme: 'dark',
    changeTheme: (theme) => {
        set({
            theme,
        })
    }

}), {
    name: "todos-theme",
    storage: createJSONStorage(() => localStorage),
}))