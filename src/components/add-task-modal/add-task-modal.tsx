import { useState } from "react";
import { Input, Modal, DatePicker, Button } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

interface IAddTaskModal {
  addNewTask: (description: string, addDate: Date) => void;
  closeModal: () => void;
  openModal: boolean;
}

const AddTaskModal = (props: IAddTaskModal) => {
  const { addNewTask, closeModal, openModal } = props;

  const [fields, setFields] = useState({ description: "", date: new Date() });
  const [emptyDescriptionError, setEmptyDescriptionError] = useState(false);

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyDescriptionError(false);
    if (event.target.value === "") {
      setEmptyDescriptionError(true);
    }
    setFields((prev) => {
      return { ...prev, description: event.target.value };
    });
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setFields((prev) => {
      return { ...prev, date: date?.toDate() || new Date() };
    });
  };

  const onOk = () => {
    if (!fields.description) {
      setEmptyDescriptionError(true);
      return;
    }
    addNewTask(fields.description, fields.date);
    setFields({ date: new Date(), description: "" });
    closeModal();
  };

  const handleClose = () => {
    setFields({ date: new Date(), description: "" });
    setEmptyDescriptionError(false);
    closeModal();
  };
  return (
    <Modal
      title="Add new task"
      open={openModal}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Close
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onOk}
          disabled={emptyDescriptionError && true}
        >
          Add
        </Button>,
      ]}
    >
      <p>Description</p>
      <Input
        placeholder="enter a discription"
        value={fields.description}
        onChange={onChangeDescription}
        status={`${emptyDescriptionError ? "error" : ""}`}
      />
      {emptyDescriptionError && (
        <div style={{ color: "red" }}>Please, enter a description</div>
      )}
      <p>Pick date</p>
      <DatePicker
        onChange={onChangeDate}
        inputReadOnly
        value={dayjs(fields.date)}
      />
    </Modal>
  );
};

export default AddTaskModal;
