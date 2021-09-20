import { todoList } from "./todoList";

const displayManager = (() => {
  const _body = document.body;
  let _selectedProject = todoList.getProjects()[0];

  const _makeProjectElement = (project) => {
    const projectName = project.getName();
    const projectElement = document.createElement("li");
    projectElement.textContent = projectName;
    projectElement.addEventListener("click", () => {
      _changeSelectedProject(projectName);
    });
    return projectElement;
  }

  const _changeSelectedProject = (name) => {
    _selectedProject = todoList.findProject(name);
    renderPage()
  }

  const _makeProjectList = (projects) => {
    const projectDiv = document.createElement("ul");
    projectDiv.classList.add("projects");
    projects.forEach(project => {
      const projectElement = _makeProjectElement(project);
      projectDiv.appendChild(projectElement);
    })
    const addProject = document.createElement("li");
    addProject.textContent = "+ Add Project";
    addProject.addEventListener("click", (e) => {
      projectDiv.appendChild(_newProjectForm());
      projectDiv.removeChild(e.target);
    });
    projectDiv.appendChild(addProject);
    return projectDiv;
  }

  const _newProjectForm = () => {
    const form = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Add";
    btnAdd.addEventListener("click", () => {
      _addProjectHandler(input.value);
    });
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    form.appendChild(input);
    form.appendChild(btnAdd);
    form.appendChild(btnCancel);
    return form;
  }

  const _makeTaskElement = (task) => {
    const title = task.getName();
    // const desc = task.getDescription();
    // const due = task.getDueDate();

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const content = document.createElement("p");
    content.textContent = `${title}`;

    taskElement.appendChild(content);
    return taskElement;
  }

  const _makeTaskList = (tasks) => {
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");
    tasks.forEach(task => {
      const taskElement = _makeTaskElement(task);
      taskList.appendChild(taskElement);
    });
    const addTask = document.createElement("li");
    addTask.textContent = "+ Add Task";
    addTask.addEventListener("click", (e) => {
      taskList.appendChild(_newTaskForm());
      taskList.removeChild(e.target);
    });
    taskList.appendChild(addTask);
    return taskList;
  }

  const _newTaskForm = () => {
    const form = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Add";
    btnAdd.addEventListener("click", () => {
      _addTaskHandler(input.value);
    });
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    form.appendChild(input);
    form.appendChild(btnAdd);
    form.appendChild(btnCancel);
    return form;
  }

  const _addTaskHandler = (name) => {
    _selectedProject.addTask(name);
    renderPage();
  }

  const _addProjectHandler = (name) => {
    todoList.addProject(name);
    renderPage();
  }

  const renderNav = () => {
    const nav = document.createElement("div");
    nav.classList = "nav";

    const title = document.createElement("span");
    title.textContent = "ToDo";

    nav.appendChild(title);
    _body.appendChild(nav);
  }

  const renderMain = () => {
    const main = document.createElement("main");
    const projectsList = _makeProjectList(todoList.getProjects());
    const taskList = _makeTaskList(_selectedProject.getTasks());
    main.appendChild(projectsList);
    main.appendChild(taskList);
    _body.appendChild(main);
  }

  const renderPage = () => {
    _body.innerHTML = "";
    renderNav();
    renderMain( );
  }

  return {
    renderPage
  }
})();

export { displayManager };