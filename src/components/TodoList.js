import Project from './Project';

const TodoList = (() => {
  let projects = [Project('Default')];

  const getProjects = () => projects;
  const setProjects = (newProjects) => {
    projects = newProjects;
  };

  const addProject = (name) => {
    const project = Project(name);
    projects.push(project);
  };

  const removeProject = (name) => {
    const filteredProjects = projects.filter(
      (project) => project.getName() !== name
    );
    setProjects(filteredProjects);
  };

  const findProject = (name) =>
    projects.find((project) => project.getName() === name);

  const hasProjects = () => projects.length > 0;

  const getAllTasks = () => {
    const allTasks = [];
    projects.forEach((project) => {
      project.getTasks().forEach((task) => {
        allTasks.push(task);
      });
    });
    return allTasks;
  };

  return {
    getProjects,
    setProjects,
    addProject,
    removeProject,
    findProject,
    hasProjects,
    getAllTasks,
  };
})();

export default TodoList;
