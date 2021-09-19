import { Task } from "./task";

const TaskList = (name) => {
  let listName = name;
  let tasks = [];

  const getName = () => listName;
  const setName = (name) => {
    listName = name;
  }

  const getTasks = () => tasks;
  const setTasks = (newTasks) => {
    tasks = newTasks;
  }

  const addTask = (name, description, dueDate) => {
    const newTask = Task(name, description, dueDate);
    tasks.push(newTask);
  }

  const deleteTask = (taskName) => {
    tasks = tasks.filter((task) => task.getName() !== taskName);
  }

  return {
    getName,
    setName,
    getTasks,
    setTasks,
    addTask,
    deleteTask,
  }
}

export { TaskList };