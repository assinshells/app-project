/**
 * Тонкая обёртка над localStorage.
 * Изолирует прямые обращения к storage от остального кода.
 */
export const Storage = {
  get(key) {
    return localStorage.getItem(key);
  },
  set(key, value) {
    localStorage.setItem(key, value);
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
