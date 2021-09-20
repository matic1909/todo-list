import { Project } from "./Project";

const todoList = (() => {
  let _projects = [Project("Default")];

  const getProjects = () => _projects;
  const setProjects = (newProjects) => {
    projects = newProjects;
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

  return {
    getProjects,
    setProjects,
    addProject,
    removeProject,
    findProject,
  }
})();

export {todoList};