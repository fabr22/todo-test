import { ITask } from "../types/tasks";

const storage = window.localStorage;

export const getTasksFromLocalStorage = () => {
  return storage.getItem("tasks")
    ? JSON.parse(storage.getItem("tasks") || " ")
    : [];
};

export const setTasksInLocalStorage = (tasks: ITask[]) => {
  storage.setItem("tasks", JSON.stringify(tasks));
};
