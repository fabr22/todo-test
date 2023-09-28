import { useState } from "react";
import { Input, Modal, DatePicker, Button } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { ITask } from "../../types/tasks";

interface IEditTaskModal {
  editTask: (taskToEdit: ITask) => void;
  closeModal: () => void;
  openModal: boolean;
  editingTask: ITask;
}

const EditTaskModal = ({
  editTask,
  closeModal,
  openModal,
  editingTask,
}: IEditTaskModal) => {
  const [taskDescription, setTaskDescription] = useState("");

  const [date, setDate] = useState<Date>(new Date());

  console.log(editingTask);
  const onChangeDescription = (
    taskDescription: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskDescription(taskDescription.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setDate(date?.toDate() || new Date());
  };

  const onOk = () => {
    editTask(editingTask);
    closeModal();
  };

  return (
    <Modal
      title="Edit task"
      open={openModal}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Save
        </Button>,
      ]}
    >
      <p>Description</p>
      <Input
        placeholder="enter a discription"
        value={taskDescription}
        onChange={onChangeDescription}
        defaultValue={editingTask.description}
      />
      <p>Pick date</p>
      <DatePicker
        onChange={onChangeDate}
        inputReadOnly
        defaultValue={dayjs(editingTask.addDate)}
        value={dayjs(date)}
      />
    </Modal>
  );
};

export default EditTaskModal;
