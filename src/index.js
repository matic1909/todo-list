import TodoList from './components/TodoList';
import displayManager from './components/UI';
// eslint-disable-next-line no-unused-vars
import style from './style.css';

displayManager.renderPage(TodoList.getProjects());
