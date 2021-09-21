import { TodoList } from "./components/TodoList";
import { displayManager } from "./components/UI";
import style from "./style.css";

displayManager.renderPage(TodoList.getProjects());
