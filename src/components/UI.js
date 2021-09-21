import { TodoList } from "./TodoList";

const displayManager = (() => {
  const _body = document.body;
  let _selectedProject = TodoList.getProjects()[0];

  // Projects
  const _makeProjectElement = (project) => {
    const projectName = project.getName();
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = projectName;
    projectTitle.addEventListener("click", () => {
      _changeSelectedProject(projectName);
    });

    projectElement.appendChild(projectTitle);

    const deleteProject = document.createElement("div");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "fa-xs");
    deleteProject.appendChild(deleteIcon);
    deleteProject.classList.add("delete-project-button");
    deleteProject.addEventListener("click", () =>
      _deleteProjectHandler(projectName)
    );
    projectElement.appendChild(deleteProject);

    return projectElement;
  };

  const _changeSelectedProject = (name) => {
    _selectedProject = TodoList.findProject(name);
    renderPage();
  };

  const _makeProjectList = (projects) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("projects");
    projects.forEach((project) => {
      const projectElement = _makeProjectElement(project);
      projectDiv.appendChild(projectElement);
    });
    const addProject = document.createElement("div");
    addProject.textContent = "+ Add Project";
    addProject.classList.add("add");
    addProject.addEventListener("click", (e) => {
      projectDiv.appendChild(_newProjectForm());
      projectDiv.removeChild(e.target);
    });
    projectDiv.appendChild(addProject);
    return projectDiv;
  };

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
  };

  // Project event handlers
  const _addProjectHandler = (name) => {
    TodoList.addProject(name);
    _changeSelectedProject(name);
  };

  const _deleteProjectHandler = (name) => {
    TodoList.removeProject(name);
    if (TodoList.hasProjects()) {
      _selectedProject = TodoList.getProjects()[0];
    } else {
      _selectedProject = null;
    }
    renderPage();
  };

  // Tasks
  const _makeTaskElement = (task) => {
    const title = task.getName();
    // const desc = task.getDescription();
    const due = task.getDueDate();

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const completeTask = document.createElement("div");
    const completeTaskIcon = document.createElement("i");
    completeTaskIcon.classList.add("far", "fa-circle");
    completeTask.appendChild(completeTaskIcon);
    completeTask.classList.add("delete-task-button");
    completeTask.addEventListener("click", () => {
      _completeTaskHandler(task);
    });

    if(task.isCompleted()) {
      taskElement.classList.add("completed");
      completeTaskIcon.classList.remove("far", "fa-circle");
      completeTaskIcon.classList.add("fas", "fa-check-circle");
    }

    const content = document.createElement("p");
    content.textContent = `${title}`;

    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");

    const dueDate = document.createElement("p");
    dateContainer.appendChild(dueDate);
    if(due !== "") {
      dueDate.textContent = due;
    } else {
      dueDate.textContent = "no date";
    }
    dueDate.addEventListener("click", (e) => {
      dateContainer.appendChild(_datePicker(task));
      dateContainer.removeChild(e.target)
    });

    taskElement.appendChild(completeTask);
    taskElement.appendChild(content);
    taskElement.appendChild(dateContainer);

    return taskElement;
  };

  const _makeTaskList = (project) => {
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    const h1 = document.createElement("h1");
    taskList.appendChild(h1);

    if (project) {
      const title = project.getName();
      h1.textContent = title;
      const tasks = project.getTasks();

      if (tasks) {
        tasks.forEach((task) => {
          const taskElement = _makeTaskElement(task);
          taskList.appendChild(taskElement);
        });
      };

      const addTask = document.createElement("div");
      addTask.textContent = "+ Add Task";
      addTask.addEventListener("click", (e) => {
        const taskForm = _newTaskForm();
        taskList.appendChild(taskForm);
        taskList.removeChild(e.target);
      });

      taskList.appendChild(addTask);
    } else {
      h1.textContent = "No Project selected"
    }

    return taskList;
  };

  const _newTaskForm = () => {
    const form = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Add";
    btnAdd.addEventListener("click", () => _addTaskHandler(input.value));
    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Cancel";
    form.appendChild(input);
    form.appendChild(btnAdd);
    form.appendChild(btnCancel);
    return form;
  };

  const _datePicker = (task) => {
    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.addEventListener("change", (e) => {
      _changeDateHandler(task, e.target.value);
    });
    return datePicker;
  }

  // Task event handlers
  const _addTaskHandler = (name) => {
    _selectedProject.addTask(name);
    renderPage();
  };

  const _changeDateHandler = (task, date) => {
    task.setDueDate(date);
    console.log(date);
    renderPage();
  }

  const _completeTaskHandler = (task) => {
    if(task.isCompleted()) {
      task.setCompleted(false);
    } else {
      task.setCompleted(true);
    }
    renderPage();
  }

  const _deleteTaskHandler = (name) => {
    _selectedProject.deleteTask(name);
    renderPage();
  };

  const renderNav = () => {
    const nav = document.createElement("div");
    nav.classList = "nav";

    const title = document.createElement("span");
    title.textContent = "ToDo";

    nav.appendChild(title);
    _body.appendChild(nav);
  };

  // Rendering
  const renderMain = () => {
    const main = document.createElement("main");
    const projectsList = _makeProjectList(TodoList.getProjects());
    const taskList = _makeTaskList(_selectedProject || null);
    main.appendChild(projectsList);
    main.appendChild(taskList);
    _body.appendChild(main);
  };

  const renderPage = () => {
    _body.innerHTML = "";
    renderNav();
    renderMain();
  };

  return {
    renderPage,
  };
})();

export { displayManager };
