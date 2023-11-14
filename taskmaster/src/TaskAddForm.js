// TaskAddForm.js

import React, { useState } from 'react';
import './App.css';
 

const TaskAddForm = ({onSave}) => {

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

  const handleCancelAdd = () => {

    //Cancel and reset input text fields

      setTitle('');

      setDescription('');

      setDueDate('');

  };

  //<input className='popup-linebr' type="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/> 

  return (

    <div>

      <input 
        className='popup-linebr' 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea 
        className='popup-linebr w-100' 
        type="textarea" 
        placeholder="Description" 
        rows={3} 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />

      <input 
        className='popup-linebr' 
        type="date" 
        placeholder="Due Date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button className='btn btn-primary secondary border-0 popup-linebr' data-bs-dismiss='modal' onClick={handleAddingTask}>Add Task</button>
      <button className='btn btn-primary secondary border-0 popup-linebr' data-bs-dismiss='modal' onClick={handleCancelAdd}>Cancel</button>
    </div>

  );

};



export default TaskAddForm;