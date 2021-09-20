import { Task } from "./task";

const Project = (name) => {
  let projectName = name;
  let tasks = [];

  const getName = () => projectName;
  const setName = (name) => {
    projectName = name;
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

export { Project };