import React, { useState } from 'react';
import './App.css';

const TaskEditForm = ({ task, onSave}) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  var tempTitle = task.title;
  var tempDescription = task.description;
  var tempDueDate = task.dueDate;

  const handleSave = () => {
    // Validate and save the edited task
    if (editedTask.title && editedTask.description && editedTask.dueDate) {
      onSave(editedTask); // Call the onSave function to update the task
    }
  };

  const handleCancelEdit = () => {
    // Cancel
    editedTask.title = tempTitle;
    editedTask.description = tempDescription;
    editedTask.dueDate = tempDueDate;
     
    onSave(editedTask); // Call the onSave function to update the task but with the old info
  };

  return (
    <div>
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
      <button className='btn btn-primary' data-bs-dismiss='modal' onClick={handleSave}>Save</button>
      <button className='btn btn-primary' data-bs-dismiss='modal' onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
};

export default TaskEditForm;
