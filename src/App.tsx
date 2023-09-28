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

import AddTaskModal from "./components/add-task-modal/add-task-modal";
import EditTaskModal from "./components/edit-task-modal/edit-task-modal";
import TasksList from "./components/tasks-list/tasks-list";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

function App() {
  const [tasks, setTasks] = useState<ITask[]>(getTasksFromLocalStorage() || []);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask>();

  useEffect(() => {
    setTasksInLocalStorage(tasks);
  }, [tasks]);

  const toggleAddModal = () => {
    setIsOpenAddModal((prev) => !prev);
  };

  const toggleEditModal = () => {
    if (isOpenEditModal) {
      setEditingTask(undefined);
    }
    setIsOpenEditModal((prev) => !prev);
  };

  const handleEditingTask = (task: ITask) => {
    setEditingTask(task);
    toggleEditModal();
  };

  const addNewTask = (description: string, addDate: Date) => {
    return setTasks([
      ...tasks,
      {
        id: description + addDate.getMilliseconds(),
        description: description,
        addDate: addDate,
        completed: false,
      },
    ]);
  };

  const addToCompletedTask = (id: string) => {
    const updatedList = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedList);
  };

  const deleteTask = (id: string) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    setTasks(updatedList);
  };

  const editTask = (
    editingFields: { description: string; date: Date },
    editingTaskId: string
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              description: editingFields.description,
              addDate: editingFields.date,
            }
          : task
      )
    );
    setEditingTask(undefined);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          {editingTask && (
            <EditTaskModal
              editTask={editTask}
              closeModal={toggleEditModal}
              openModal={isOpenEditModal}
              editingTask={editingTask}
            />
          )}
          <TasksList
            tasks={tasks}
            addToCompletedTask={addToCompletedTask}
            deleteTask={deleteTask}
            handleEditingTask={handleEditingTask}
          />
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
