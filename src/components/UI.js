import TodoList from './TodoList';

const displayManager = (() => {
  const { body } = document;
  let selectedProject = TodoList.getProjects()[0] || null;
  let tasksToShow = selectedProject.getTasks();

  // Filters
  const filters = () => {
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filters');

    const allTasksFilter = document.createElement('div');
    allTasksFilter.textContent = 'Inbox';
    allTasksFilter.addEventListener('click', () => {
      tasksToShow = TodoList.getAllTasks();
      renderPage();
    });

    const finishedTasksFilter = document.createElement('div');
    finishedTasksFilter.textContent = 'Completed';
    finishedTasksFilter.addEventListener('click', () => {
      tasksToShow = TodoList.getAllTasks().filter(
        (task) => task.isCompleted() === true
      );
      renderPage();
    });

    filterDiv.appendChild(allTasksFilter);
    filterDiv.appendChild(finishedTasksFilter);
    return filterDiv;
  };

  // Projects
  const ProjectElement = (project) => {
    const projectName = project.getName();
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = projectName;
    projectTitle.addEventListener('click', () => {
      changeSelectedProject(projectName);
    });

    projectElement.appendChild(projectTitle);

    const deleteProject = document.createElement('div');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'fa-xs');
    deleteProject.appendChild(deleteIcon);
    deleteProject.classList.add('delete-project-button');
    deleteProject.addEventListener('click', () =>
      deleteProjectHandler(projectName)
    );
    projectElement.appendChild(deleteProject);

    return projectElement;
  };

  const changeSelectedProject = (name) => {
    selectedProject = TodoList.findProject(name);
    tasksToShow = selectedProject.getTasks();
    renderPage();
  };

  const ProjectList = (projects) => {
    const projectDiv = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Your Projects';
    title.classList.add('projects-title');
    projectDiv.appendChild(title);
    projectDiv.classList.add('projects');
    projects.forEach((project) => {
      const projectElement = ProjectElement(project);
      projectDiv.appendChild(projectElement);
    });
    const addProject = document.createElement('div');
    addProject.textContent = '+ Add Project';
    addProject.classList.add('add');
    addProject.addEventListener('click', (e) => {
      projectDiv.appendChild(newProjectForm());
      projectDiv.removeChild(e.target);
    });
    projectDiv.appendChild(addProject);
    return projectDiv;
  };

  const newProjectForm = () => {
    const form = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Add';
    btnAdd.addEventListener('click', () => {
      addProjectHandler(input.value);
    });
    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Cancel';
    form.appendChild(input);
    form.appendChild(btnAdd);
    form.appendChild(btnCancel);
    return form;
  };

  // Project event handlers
  const addProjectHandler = (name) => {
    TodoList.addProject(name);
    changeSelectedProject(name);
  };

  const deleteProjectHandler = (name) => {
    TodoList.removeProject(name);
    if (TodoList.hasProjects()) {
      [selectedProject] = TodoList.getProjects();
    } else {
      selectedProject = null;
    }
    renderPage();
  };

  // Tasks
  const TaskElement = (task) => {
    const title = task.getName();
    const due = task.getDueDate();

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const completeTask = document.createElement('div');
    const completeTaskIcon = document.createElement('i');
    completeTaskIcon.classList.add('far', 'fa-circle');
    completeTask.appendChild(completeTaskIcon);
    completeTask.classList.add('delete-task-button');
    completeTask.addEventListener('click', () => {
      completeTaskHandler(task);
    });

    if (task.isCompleted()) {
      taskElement.classList.add('completed');
      completeTaskIcon.classList.remove('far', 'fa-circle');
      completeTaskIcon.classList.add('fas', 'fa-check-circle');
    }

    const content = document.createElement('p');
    content.textContent = `${title}`;

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');

    const dueDate = document.createElement('p');
    dateContainer.appendChild(dueDate);
    if (due !== '') {
      dueDate.textContent = due;
    } else {
      dueDate.textContent = 'no date';
    }
    dueDate.addEventListener('click', (e) => {
      dateContainer.appendChild(datePicker(task));
      dateContainer.removeChild(e.target);
    });

    taskElement.appendChild(completeTask);
    taskElement.appendChild(content);
    taskElement.appendChild(dateContainer);

    return taskElement;
  };

  const TaskForm = () => {
    const form = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Add';
    btnAdd.addEventListener('click', () => addTaskHandler(input.value));
    const btnCancel = document.createElement('button');
    btnCancel.textContent = 'Cancel';
    form.appendChild(input);
    form.appendChild(btnAdd);
    form.appendChild(btnCancel);
    return form;
  };

  const TaskList = (tasks) => {
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    if (tasks) {
      tasks.forEach((task) => {
        const taskElement = TaskElement(task);
        taskList.appendChild(taskElement);
      });
    }

    const addTaskButton = document.createElement('div');
    addTaskButton.textContent = '+ Add Task';
    addTaskButton.addEventListener('click', (e) => {
      const taskForm = TaskForm();
      taskList.appendChild(taskForm);
      taskList.removeChild(e.target);
    });

    taskList.appendChild(addTaskButton);

    return taskList;
  };

  const datePicker = (task) => {
    const input = document.createElement('input');
    input.type = 'date';
    input.addEventListener('change', (e) => {
      changeDateHandler(task, e.target.value);
    });
    return input;
  };

  // Task event handlers
  const addTaskHandler = (name) => {
    selectedProject.addTask(name);
    renderPage();
  };

  const changeDateHandler = (task, date) => {
    task.setDueDate(date);
    renderPage();
  };

  const completeTaskHandler = (task) => {
    if (task.isCompleted()) {
      task.setCompleted(false);
    } else {
      task.setCompleted(true);
    }
    renderPage();
  };

  // const _deleteTaskHandler = (name) => {
  //   selectedProject.deleteTask(name);
  //   renderPage();
  // };

  const renderNav = () => {
    const nav = document.createElement('div');
    nav.classList = 'nav';

    const title = document.createElement('span');
    title.textContent = 'ToDo';

    const logo = document.createElement('i');
    logo.classList.add('nav-logo', 'fas', 'fa-check-double');

    nav.appendChild(title);
    nav.appendChild(logo);
    body.appendChild(nav);
  };

  const LeftSidepanel = (projects) => {
    const sidePanel = document.createElement('div');
    sidePanel.classList.add('side-panel');
    sidePanel.appendChild(filters());
    sidePanel.appendChild(ProjectList(projects));
    return sidePanel;
  };

  // Rendering
  const renderMain = () => {
    const main = document.createElement('main');
    const sidePanel = LeftSidepanel(TodoList.getProjects());
    const taskList = TaskList(tasksToShow);
    main.appendChild(sidePanel);
    main.appendChild(taskList);
    body.appendChild(main);
  };

  const renderPage = () => {
    body.innerHTML = '';
    renderNav();
    renderMain();
  };

  return {
    renderPage,
  };
})();

export default displayManager;
