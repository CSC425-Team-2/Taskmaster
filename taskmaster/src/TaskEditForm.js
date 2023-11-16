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
        className='popup-linebr'
        type="text"
        placeholder="Title"
        maxLength={40}
        value={editedTask.title}
        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
      />

      <textarea
        className='popup-linebr w-100'
        type="textarea"
        placeholder="Description"
        maxLength={256}
        rows={3}
        value={editedTask.description}
        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
      />

      <input
        className='popup-linebr'
        type="date"
        placeholder="Due Date"
        value={editedTask.dueDate}
        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
      />
      <button className='btn btn-primary secondary border-0 popup-linebr' data-bs-dismiss='modal' onClick={handleSave}>Save</button>
      <button className='btn btn-primary secondary border-0 popup-linebr' data-bs-dismiss='modal' onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
};

export default TaskEditForm;
