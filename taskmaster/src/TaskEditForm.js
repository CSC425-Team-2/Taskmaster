import React, { useState } from 'react';
import 'App.css';

const TaskEditForm = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    // Validate and save the edited task
    if (editedTask.title && editedTask.description && editedTask.dueDate) {
      onSave(editedTask); // Call the onSave function to update the task
    }
  };

  return (
    <div className="custom-popup">
      <h2>Edit Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={editedTask.title}
        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={editedTask.description}
        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={editedTask.dueDate}
        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TaskEditForm;
