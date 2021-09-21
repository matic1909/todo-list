const Task = (name, description = "", dueDate = "") => {
  let taskName = name;
  // let taskDesc = description;
  let taskDueDate = dueDate;

  const getName = () => taskName;
  const setName = (newName) => {
    taskName = newName;
  }

  // const getDescription = () => taskDesc;
  // const setDescription = (newDesc) => {
  //   taskDesc = newDesc;
  // }

  const getDueDate = () => taskDueDate;
  const setDueDate = (newDate) => {
    taskDueDate = newDate;
  }

  return { getName, setName, getDueDate, setDueDate };
}

export { Task }