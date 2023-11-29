// TaskAddForm.js

import React, { useState } from 'react';
import './App.css';
 

const TaskAddForm = ({onSave}) => {

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [dueDate, setDueDate] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  };

  const handleAddingTask = () => {

    // Validate and add task

    if (title && description && dueDate) {

      const newTask = { title, description, dueDate };
      onSave(newTask); //Original prop function for UI

      //Local host number will change depending on who is hosting
      fetch('http://localhost:5267/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); //Returns the json in .NET, viewable in terminal
        })
        .catch(error => console.error('Error creating task:', error));
      }
        //Reset the UI state
        setTitle('');

        setDescription('');

        setDueDate('');
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
        maxLength={40}
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea 
        className='popup-linebr w-100' 
        type="textarea" 
        placeholder="Description"
        maxLength={256}
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