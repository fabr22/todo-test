import React, { useEffect, useState } from "react";
import Header from "./components/header/header";
import "./App.css";
import { Content } from "antd/es/layout/layout";
import { Button, Layout, Space } from "antd";
import { ITask } from "./types/tasks";
import {
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./utils/local-storage";
import ListItem from "./components/list-item/list-item";
import AddTaskModal from "./components/add-task-modal/add-task-modal";
import EditTaskModal from "./components/edit-task-modal/edit-task-modal";

function App() {
  const [tasks, setTasks] = useState<ITask[]>(getTasksFromLocalStorage() || []);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask>({
    id: "",
    description: "",
    completed: false,
    addDate: new Date(),
  });
  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
  };

  const toggleAddModal = () => {
    setIsOpenAddModal((prev) => !prev);
  };

  const toggleEditModal = () => {
    setIsOpenEditModal((prev) => !prev);
  };

  const handleEditingTask = (task: ITask) => {
    setEditingTask(task);
    toggleEditModal();
  };

  useEffect(() => {
    setTasksInLocalStorage(tasks);
  }, [tasks]);

  const addNewTask = (description: string, addDate: Date) => {
    if (description === "") {
      alert("Please, enter a description");
      return;
    }
    if (addDate.getDate() === undefined) {
      alert("Please, choose add date");
      return;
    }
    const checkOnMatching = tasks.find(
      (task) =>
        task?.description?.toLowerCase() === description.toLowerCase() &&
        task.addDate === addDate
    );

    return !checkOnMatching
      ? setTasks([
          ...tasks,
          {
            id: description + addDate.getMilliseconds(),
            description: description,
            addDate: addDate,
            completed: false,
          },
        ])
      : alert("this tasks has been already exist");
  };

  const addToCompletedTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (taskToEdit: ITask) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskToEdit.id
          ? {
              ...task,
              description: taskToEdit.description,
              addDate: taskToEdit.addDate,
            }
          : task
      )
    );
  };

  return (
    <Layout>
      <Header tasks={tasks} />
      <Content style={contentStyle}>
        <Space direction="vertical">
          <Button type="primary" onClick={toggleAddModal}>
            Add new task
          </Button>
          <AddTaskModal
            openModal={isOpenAddModal}
            closeModal={toggleAddModal}
            addNewTask={addNewTask}
          />
          <EditTaskModal
            editTask={editTask}
            closeModal={toggleEditModal}
            openModal={isOpenEditModal}
            editingTask={editingTask}
          />
          {tasks.map((task: ITask) => {
            return (
              <ListItem
                task={task}
                key={task.id}
                deleteTask={deleteTask}
                addToCompletedTask={addToCompletedTask}
                editingTask={handleEditingTask}
              />
            );
          })}
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
