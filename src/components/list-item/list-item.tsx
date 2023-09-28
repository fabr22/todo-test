import { ITask } from "../../types/tasks";
import { Button, Space } from "antd";

interface IItem {
  task: ITask;
  deleteTask: (id: string) => void;
  addToCompletedTask: (id: string) => void;
  editingTask: (tasl: ITask) => void;
}

const ListItem = ({
  task,
  deleteTask,
  addToCompletedTask,
  editingTask,
}: IItem) => {
  const { description, completed, addDate, id } = task;

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
        onClick={handleAddToCompletedTask}
        style={{
          cursor: "pointer",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {description}
      </div>
      <div>{new Date(addDate).toLocaleDateString()}</div>
      <Button danger onClick={handleDeleteTask}>
        delete
      </Button>
      <Button onClick={handleEditingTask}>edit</Button>
    </Space>
  );
};

export default ListItem;
