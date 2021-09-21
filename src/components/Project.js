import Task from './Task';

const Project = (name) => {
  let projectName = name;
  let tasks = [];

  const getName = () => projectName;
  const setName = (newName) => {
    projectName = newName;
  };

  const getTasks = () => tasks;
  const setTasks = (newTasks) => {
    tasks = newTasks;
  };

  const addTask = (taskName, description, dueDate) => {
    const newTask = Task(taskName, description, dueDate);
    tasks.push(newTask);
  };

  const deleteTask = (taskName) => {
    tasks = tasks.filter((task) => task.getName() !== taskName);
  };

  const isEmpty = () => tasks.length < 0;

  const findTask = (taskName) =>
    tasks.find((task) => task.getName() === taskName);

  return {
    getName,
    setName,
    getTasks,
    setTasks,
    addTask,
    deleteTask,
    isEmpty,
    findTask,
  };
};

export default Project;
