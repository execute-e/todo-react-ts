import { type Priority } from "./store/useStore";

export const isPriority = (value: string | undefined): value is Priority => {
  return value === 'low' || value === 'medium' || value === 'high';
}

export const capitalize = (str: string): string => {
    if (!str || typeof str !== 'string') return '';
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1)
}