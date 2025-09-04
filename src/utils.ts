import { type Priority } from "./store/useStorage";

export const isPriority = (value: string | undefined): value is Priority => {
  return value === 'low' || value === 'medium' || value === 'high';
}

export const capitalize = (str: string): string => {
    if (!str || typeof str !== 'string') return '';
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatDateTime = (timestamp: number): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp));
};