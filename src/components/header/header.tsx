import { Header as AntdHeader } from "antd/es/layout/layout";
import { ITask } from "../../types/tasks";

import { Typography } from "antd";

const { Text, Title } = Typography;
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 120,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

interface IHeader {
  tasks: ITask[];
}

const Header = ({ tasks }: IHeader) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const tasksToComplete = tasks.length - completedTasks.length;

  return (
    <AntdHeader style={headerStyle}>
      <Title level={2}>Todo List</Title>
      <Text>Completed: {completedTasks.length}</Text>
      <Text>To do: {tasksToComplete}</Text>
    </AntdHeader>
  );
};

export default Header;
