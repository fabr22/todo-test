import { useState } from "react";
import { Input, Modal, DatePicker, Button } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { ITask } from "../../types/tasks";

interface IEditTaskModal {
  editTask: (
    editingFields: { description: string; date: Date },
    editingTaskId: string
  ) => void;
  closeModal: () => void;
  openModal: boolean;
  editingTask: ITask;
}

const EditTaskModal = (props: IEditTaskModal) => {
  const { editingTask, editTask, closeModal, openModal } = props;

  const [editingFields, setEditingFileds] = useState({
    description: editingTask.description,
    date: editingTask.addDate,
  });
  const [emptyDescriptionError, setEmptyDescriptionError] = useState(false);

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyDescriptionError(false);
    if (event.target.value === "") {
      setEmptyDescriptionError(true);
    }
    setEditingFileds((prev) => {
      return {
        ...prev,
        description: event.target.value,
      };
    });
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setEditingFileds((prev) => {
      return { ...prev, date: date?.toDate() || new Date() };
    });
  };

  const onOk = () => {
    if (!editingFields.description) {
      setEmptyDescriptionError(true);
      return;
    }
    editTask(editingFields, editingTask.id);
    closeModal();
  };

  const handleClose = () => {
    setEditingFileds({ date: new Date(), description: "" });
    setEmptyDescriptionError(false);
    closeModal();
  };
  return (
    <Modal
      title="Edit task"
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
          Save
        </Button>,
      ]}
    >
      <p>Description</p>
      <Input
        placeholder="enter a discription"
        value={editingFields.description}
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
        value={dayjs(editingFields.date)}
      />
    </Modal>
  );
};

export default EditTaskModal;
