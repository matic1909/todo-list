import { todoList } from "./components/todoList";
import { displayManager } from "./components/UI";
import style from "./style.css";

displayManager.renderPage(todoList.getProjects());
