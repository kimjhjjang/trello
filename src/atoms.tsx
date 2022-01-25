import { atom } from "recoil";
import { loadTodos } from "./LocalStorage/LocalStorage";

export interface ITodo {
    id : number;
    text : string;
};

export interface IToDoState {
    [key : string] : ITodo[];
};

export const defaultTodos: IToDoState = {
    "To Do": [],
    "Doing": [],
    "Done": [],
}

export const todoState = atom<IToDoState>({
    key: "toDo",
    default: loadTodos() ?? defaultTodos,
});
