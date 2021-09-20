import { Task } from "./task";

const Project = (name) => {
  let projectName = name;
  let _tasks = [];

  const getName = () => projectName;
  const setName = (name) => {
    projectName = name;
  };

  const getTasks = () => _tasks;
  const setTasks = (newTasks) => {
    _tasks = newTasks;
  };

  const addTask = (name, description, dueDate) => {
    const newTask = Task(name, description, dueDate);
    _tasks.push(newTask);
  };

  const deleteTask = (taskName) => {
    _tasks = _tasks.filter((task) => task.getName() !== taskName);
  };

  const isEmpty = () => {
    return _tasks.length < 0;
  };

  return {
    getName,
    setName,
    getTasks,
    setTasks,
    addTask,
    deleteTask,
    isEmpty,
  };
};

export { Project };
