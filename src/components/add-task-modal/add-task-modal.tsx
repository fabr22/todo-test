import { useState } from "react";
import { Input, Modal, DatePicker, Button } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

interface IAddTaskModal {
  addNewTask: (description: string, addDate: Date) => void;
  closeModal: () => void;
  openModal: boolean;
}

const AddTaskModal = ({ addNewTask, closeModal, openModal }: IAddTaskModal) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const onChangeDescription = (
    taskDescription: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskDescription(taskDescription.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setDate(date?.toDate() || new Date());
  };

  const onOk = () => {
    addNewTask(taskDescription, date);
    setTaskDescription("");
    setDate(new Date());
    closeModal();
  };

  return (
    <Modal
      title="Add new task"
      open={openModal}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Add
        </Button>,
      ]}
    >
      <p>Description</p>
      <Input
        placeholder="Basic usage"
        value={taskDescription}
        onChange={onChangeDescription}
      />
      <p>Pick date</p>
      <DatePicker
        onChange={onChangeDate}
        inputReadOnly
        defaultValue={dayjs(new Date())}
        value={dayjs(date)}
      />
    </Modal>
  );
};

export default AddTaskModal;
