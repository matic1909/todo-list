import { Project } from "./Project";

const TodoList = (() => {
  let _projects = [Project("Default")];

  const getProjects = () => _projects;
  const setProjects = (newProjects) => {
    _projects = newProjects;
  }

  const addProject = (name) => {
    const project = Project(name);
    _projects.push(project);
  }

  const removeProject = (name) => {
    const filteredProjects = _projects.filter((project) => project.getName() !== name);
    setProjects(filteredProjects);
  }

  const findProject = (name) => {
    return _projects.find((project) => project.getName() === name);
  }

  const hasProjects = () => {
    return _projects.length > 0;
  }

  return {
    getProjects,
    setProjects,
    addProject,
    removeProject,
    findProject,
    hasProjects
  }
})();

export { TodoList };