import { Space } from "antd";
import { ITask } from "../../types/tasks";
import ListItem from "../list-item/list-item";

interface ITasksList {
  tasks: ITask[];
  deleteTask: (id: string) => void;
  addToCompletedTask: (id: string) => void;
  handleEditingTask: (task: ITask) => void;
}

const TasksList = (props: ITasksList) => {
  const { tasks, deleteTask, addToCompletedTask, handleEditingTask } = props;
  return (
    <Space direction="vertical">
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
  );
};
export default TasksList;
