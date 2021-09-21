const Task = (name, description = '', dueDate = '', completed = false) => {
  let taskName = name;
  let taskDesc = description;
  let taskDueDate = dueDate;
  let taskCompleted = completed;

  const getName = () => taskName;
  const setName = (newName) => {
    taskName = newName;
  };

  const getDescription = () => taskDesc;
  const setDescription = (newDesc) => {
    taskDesc = newDesc;
  };

  const getDueDate = () => taskDueDate;
  const setDueDate = (newDate) => {
    taskDueDate = newDate;
  };

  const isCompleted = () => taskCompleted;
  const setCompleted = (status) => {
    taskCompleted = status;
  };

  return {
    getName,
    setName,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    isCompleted,
    setCompleted,
  };
};

export default Task;
