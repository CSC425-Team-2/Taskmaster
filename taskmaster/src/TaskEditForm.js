import React, { useState } from 'react';
import './App.css';

const TaskEditForm = ({ task, onSave}) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  var tempTitle = task.title;
  var tempDescription = task.description;
  var tempDueDate = task.dueDate;

  //Takes a date in the "MM-dd-yyyy" format that we've been using on the frontend--
  //and converts it to "yyyy-mm-dd" for use in the backend
  const formatDateForBackend = (date) => {
    const [month, day, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  //For checking the date format. Valid dates for backend are in "yyyy-mm-dd"
  const isDateFormatValid = (dateString) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(dateString);
  };

  const updateTask = async (task) => {
    //Create a copy of the task so we can correct the datetime format going to the backend
    const taskCopy = { ...task };

    //If the task's duedate isn't valid ("yyyy-mm-dd"), change it to "mm-dd-yyyy"
    //Since our UI code displays dates as "mm-dd-yyyy" once retrieved from the DB--
    //they must be reformatted when editing the tasks so the DB will accept the date
    if(!isDateFormatValid(task.dueDate)) {
      taskCopy.dueDate = formatDateForBackend(taskCopy.dueDate);
    }

    try {
      const response = await fetch(`http://localhost:5267/api/tasks/edit/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskCopy),
      });
      
      if(!response.ok) {
        console.error("Failed to update edited task", response.statusText);
      } else {
        console.log("Edited task updated successfully");
      }

    } catch (error) {
      console.error("Error while updated edited task:", error.message);
    }
  };

  const handleSave = () => {
    // Validate and save the edited task
    if (editedTask.title && editedTask.description && editedTask.dueDate) {
      console.log(editedTask);
      updateTask(editedTask);
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

  function formatDateForInput(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  }

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
        onChange={(e) => setEditedTask({ ...editedTask, dueDate: formatDateForInput(e.target.value) })}
      />
      <button className='btn btn-primary secondary border-0 popup-linebr' data-bs-dismiss='modal' onClick={handleSave}>Save</button>
      <button className='btn btn-primary secondary border-0 popup-linebr' data-bs-dismiss='modal' onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
};

export default TaskEditForm;