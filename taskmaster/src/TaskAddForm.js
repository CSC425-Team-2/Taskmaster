// TaskAddForm.js

import React, { useState } from 'react';
import './App.css';
 

const TaskAddForm = ({onSave, onCancel}) => {

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [dueDate, setDueDate] = useState('');

  const handleAddingTask = () => {

    // Validate and add task

    if (title && description && dueDate) {

        onSave({ title, description, dueDate });

        setTitle('');

        setDescription('');

        setDueDate('');

    }

  };



  return (

    <div className="custom-popup">

      <input class='form-label' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}

      />

      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}

      />

      <button class='btn btn-primary' data-bs-dismiss='modal' onClick={handleAddingTask}>Add Task</button>
      <button class='btn btn-primary' data-bs-dismiss='modal'>Cancel</button>
    </div>

  );

};



export default TaskAddForm;