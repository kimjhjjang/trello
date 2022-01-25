import { IToDoState } from "../atoms";

export const LOCALSTORAGE = 'TODOS';

export const loadTodos = () => {
    const localTodos = localStorage.getItem(LOCALSTORAGE);
    if (localTodos) {
        return JSON.parse(localTodos);
    }
    return null;
};

export const saveTodos = (todos: IToDoState) => {
    localStorage.setItem(LOCALSTORAGE, JSON.stringify(todos));
};
