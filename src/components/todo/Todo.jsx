import { Component } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { idGenerator } from "../../tools/generator";
import Task from "../task/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./todo.module.css";
import ConfirmDialog from "../ConfirmDialog";

class Todo extends Component {
  state = {
    tasks: [],
    newTaskTitle: "",
    selectedTasks: new Set(),
  };

  handleInputChange = (event) => {
    const newTaskTitle = event.target.value;
    this.setState({
      newTaskTitle,
    });
  };

  addNewTaskDatas = () => {
    const trimmedTitle = this.state.newTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }
    const newTask = {
      id: idGenerator(),
      title: trimmedTitle,
    };
    const tasks = [...this.state.tasks];
    tasks.push(newTask);
    this.setState({
      tasks,
      newTaskTitle: "",
    });
  };

  handleInputKeyDown = (event) => {
    if (event.key === "Enter") this.addNewTaskDatas();
  };

  onDeleteButton = (taskId) => {
    const { tasks, selectedTasks } = this.state;
    const newTasks = tasks.filter((task) => task.id !== taskId);
    const newState = {
      tasks: newTasks,
    };
    if (selectedTasks.has(taskId)) {
      const newSelectedTasks = new Set(selectedTasks);
      newSelectedTasks.delete(taskId);
      newState.selectedTasks = newSelectedTasks;
    }
    this.setState(newState);
  };

  onSelectCheckbox = (taskId) => {
    const selectedTasks = new Set(this.state.selectedTasks);
    selectedTasks.has(taskId)
      ? selectedTasks.delete(taskId)
      : selectedTasks.add(taskId);
    this.setState({
      selectedTasks,
    });
    console.log(selectedTasks);
  };

  deleteSelectedTasks = () => {
    const newTasks = [];
    const { tasks, selectedTasks } = this.state;
    tasks.forEach((task) => {
      if (!selectedTasks.has(task.id)) {
        newTasks.push(task);
      }
    });
    this.setState({
      tasks: newTasks,
      selectedTasks: new Set(),
    });
    console.log(this.selectedTasks);
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8">
            <InputGroup>
              <Form.Control
                placeholder="Input task title"
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                value={this.state.newTaskTitle}
              />
              <Button
                variant="btn btn-outline-success"
                onClick={this.addNewTaskDatas}
                disabled={!this.state.newTaskTitle.trim()}
              >
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          {this.state.tasks.map((task) => {
            return (
              <Task
                data={task}
                key={task.id}
                onDeleteButton={this.onDeleteButton}
                onSelectCheckbox={this.onSelectCheckbox}
              />
            );
          })}
        </Row>
        <Row>
          <Col>
            <Button
              variant="btn btn-outline-danger"
              className="btn-sm mr-8 mt-5 d-flex justify-content-center align-items-center float-end"
              disabled={!this.state.selectedTasks.size}
              onClick={this.deleteSelectedTasks}
            >
              <FontAwesomeIcon
                className={styles.deleteSelectedIcon}
                icon={faTrash}
              />
              <span>All selected</span>
            </Button>
          </Col>
        </Row>
        <ConfirmDialog />
      </Container>
    );
  }
}

export default Todo;
