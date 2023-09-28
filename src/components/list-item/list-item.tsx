import { Button, Space } from "antd";

import { ITask } from "../../types/tasks";

interface IItem {
  task: ITask;
  deleteTask: (id: string) => void;
  addToCompletedTask: (id: string) => void;
  editingTask: (task: ITask) => void;
}

const ListItem = ({ task, ...props }: IItem) => {
  const { description, completed, addDate, id } = task;
  const { deleteTask, addToCompletedTask, editingTask } = props;

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  const handleAddToCompletedTask = () => {
    addToCompletedTask(id);
  };

  const handleEditingTask = () => {
    editingTask(task);
  };
  return (
    <Space>
      <div
        style={{
          cursor: "pointer",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {description}
      </div>
      <div>{new Date(addDate).toLocaleDateString()}</div>
      <Button onClick={handleAddToCompletedTask}>
        {completed ? "to do" : "completed"}
      </Button>
      <Button onClick={handleEditingTask}>edit</Button>
      <Button danger onClick={handleDeleteTask}>
        delete
      </Button>
    </Space>
  );
};

export default ListItem;
