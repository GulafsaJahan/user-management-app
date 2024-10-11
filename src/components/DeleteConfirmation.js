import React from "react";

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this user?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default DeleteConfirmation;
