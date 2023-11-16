// TaskForm.js

   import React, { useState } from 'react';

 

   const TaskForm = ({ onTaskAdd }) => {

     const [title, setTitle] = useState('');

     const [description, setDescription] = useState('');

     const [dueDate, setDueDate] = useState('');

     const [isCompleted, setIsCompleted] = useState(false); // Initialize isCompleted


 

     /*const handleAddTask = () => {

       // Validate and add task

       if (title && description && dueDate) {

         onTaskAdd({ title, description, dueDate });

         setTitle('');

         setDescription('');

         setDueDate('');

       }

     };*/


     const handleAddTask = async () => {

      const testUsername = "Drew Allen";

      // Validate and add task
      if (title && description && dueDate) {
        const newTask = { title, description, dueDate, isCompleted, username: testUsername };
  
        try {
          // Make an HTTP POST request to your backend endpoint
          const response = await fetch('http://localhost:5267/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
          });
    
          if (response.ok) {
            // If the request is successful, call the onTaskAdd callback
            onTaskAdd(newTask);
            setTitle('');
            setDescription('');
            setDueDate('');
            setIsCompleted(false);
          } else {
            // Handle error cases
            console.error('Failed to add task');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    };

 

     return (

       <div>

         <input

           type="text"

           placeholder="Title"

           value={title}

           onChange={(e) => setTitle(e.target.value)}

         />

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

         <button onClick={handleAddTask}>Add Task</button>

       </div>

     );

   };

 

   export default TaskForm;