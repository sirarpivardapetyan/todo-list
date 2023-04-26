import { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Task from "../task/Task";
import ConfirmDialog from "../ConfirmDialog";
import DeleteSelected from "../deleteSelected/DeleteSelected";
import TaskApi from "../../api/taskApi";
import TaskModal from "../taskModal/TaskModal";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    taskApi.getAll().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const onAddNewTaskDatas = (newTask) => {
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success("The task has been added successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onDeleteButton = (taskId) => {
    taskApi
      .delete(taskId)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(newTasks);
        if (selectedTasks.has(taskId)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskId);
          setSelectedTasks(newSelectedTasks);
        }
        toast.info("The task has been deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const onSelectCheckbox = (taskId) => {
    const selectedTasksCopy = new Set(selectedTasks);
    selectedTasksCopy.has(taskId)
      ? selectedTasksCopy.delete(taskId)
      : selectedTasksCopy.add(taskId);
    setSelectedTasks(selectedTasksCopy);
  };

  const deleteSelectedTasks = () => {
    taskApi
      .deleteMany([...selectedTasks])
      .then(() => {
        const newTasks = [];
        const selectedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            newTasks.push(task);
          }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.info(
          `The ${selectedTasksCount} task/tasks has/have been deleted successfully`
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectAllTasks = () => {
    const taskIds = tasks.map((task) => task._id);
    setSelectedTasks(new Set(taskIds));
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const onEditTask = (editedTask) => {
    taskApi
      .update(editedTask)
      .then((task) => {
        const copyTasks = [...tasks];
        const foundIndex = copyTasks.findIndex((t)=>t._id === task._id);
        copyTasks[foundIndex] = task;
        setTasks(copyTasks);
        toast.success(`Tasks havs been updated successfully!`);
        setEditingTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <Container>
      <Row className="justify-content-center mb-4">
        <Col xs="6" sm="4" md="3">
          <Button
            variant="btn btn-outline-success"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Add new task
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12">
          <div className="d-flex justify-content-end align-items-center gap-3">
            <Button variant="outline-warning" onClick={selectAllTasks}>
              Select all
            </Button>
            <Button variant="outline-secondary" onClick={resetSelectedTasks}>
              Reset
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onDeleteButton={setTaskToDelete}
              onSelectCheckbox={onSelectCheckbox}
              checked={selectedTasks.has(task._id)}
              onTaskEdit={setEditingTask}
            />
          );
        })}
      </Row>
      <DeleteSelected
        disabled={!selectedTasks.size}
        tasksCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}
      />
      {taskToDelete && (
        <ConfirmDialog
          onCancel={() => {
            setTaskToDelete(null);
          }}
          onSubmit={() => {
            onDeleteButton(taskToDelete);
            setTaskToDelete(null);
          }}
          tasksCount={1}
        />
      )}
      {isAddTaskModalOpen && (
        <TaskModal
          onCancel={() => {
            setIsAddTaskModalOpen(false);
          }}
          onSave={onAddNewTaskDatas}
        />
      )}
      {editingTask && (
        <TaskModal
          onCancel={() => {
            setEditingTask(null);
          }}
          onSave={onEditTask}
          data={editingTask}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}

export default Todo;
