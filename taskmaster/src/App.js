import React, { useState, useEffect } from 'react';

//import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";

import TaskList from './TaskList';
import Task from './Task';
import TaskEditForm from './TaskEditForm';
import TaskAddForm from './TaskAddForm';
import './App.css';
import taskMasterLogo from './images/taskmaster-logo.jpg'

  // App.js
  const App = () => {

    const [tasks, setTasks] = useState([]);

    const [selectedTask, setSelectedTask] = useState(null);

    const [editingTask, setEditingTask] = useState(null);

    const [noTasksMessage, setNoTasksMessage] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch('http://localhost:5267/api/tasks');
            if(!response.ok) {
              throw new Error(`HTTP error! Status: ${response.message}`);
            }
            const data = await response.json();
            console.log(data);

            //Fixing the discrepency between the properties of our local Tasks & our backend Tasks
            const transformedTasks = data.map((dbTask) => ({
              id: dbTask.taskID,
              title: dbTask.title, // Assuming title is available in your database tasks
              description: dbTask.description,
              dueDate: dbTask.dueDate,
              completed: dbTask.isCompleted,
            }));

            if(data.length > 0) {
              setTasks(transformedTasks);
            }
            else {
              setNoTasksMessage("No tasks created.");
            }
          } catch (error) {
            throw new Error('Error fetching data', error);
          }
        };

        fetchTasks();
      }, []);

    const deleteTask = async (taskId) => {
      try {
        console.log("deleteTask initiated with id: ", taskId);
        const response = await fetch(`http://localhost:5267/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.error('Failed to delete task:', response.statusText);
        } else {
          console.log('Task deleted successfully');
        }
      } catch (error) {
        console.error('Error while deleting task:', error.message);
      }
    };

    const toggleTaskComplete = async (taskId) => {
      try {
        console.log("toggle complete initiated with id: ", taskId);
        const response = await fetch(`http://localhost:5267/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.error('Failed to update task:', response.statusText);
        } else {
          console.log('Task updated succesffuly');
        }
      } catch (error) {
        console.error("Error while updating task:", error.message);
      }
    };

    const handleAddTask = (newTask) => {

      const formattedDueDate = formatDueDate(newTask.dueDate);
      // Create a new task with a unique ID and mark it as not completed

      const task = { ...newTask, id: tasks.length + 1, completed: false, dueDate:formattedDueDate};
      console.log("New Task: ", task);

      setTasks([...tasks, task]);

    };

    const formatDueDate = (dueDate) => {
      const date = new Date(dueDate);
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1 ;
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    };


    const handleTaskClick = (taskId) => {

      // Find and select the clicked task

      const task = tasks.find((t) => t.id === taskId);

      setSelectedTask(task);

    };

    const handleCompleteTask = (task) => {

       // Set the task complete or incomplete
       task.completed = !task.completed;
       toggleTaskComplete(task.id);

       //I don't know what this does excatly but it breaks if I take it out
       setTasks(tasks.map((t) => (t.id === task.id ? task : t)))

       //setSelectedTask(null);

   };
 
   const handleSaveEditedTask = (editedTask) => {
     // Update the task in the 'tasks' state
     const updatedTasks = tasks.map((task) =>
       task.id === editedTask.id ? editedTask : task
     );
     setTasks(updatedTasks);
 
     // Update the selected task with the edited task
     setSelectedTask(editedTask);
     setEditingTask(null); // Close the edit form
   };

    const handleDeleteTask = (taskId) => {

      // Delete the task and clear the selection
      deleteTask(taskId);
      console.log("Task to delete: ", taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));

      setSelectedTask(null);

    };

    const handleEditTask = (editedTask) => {
      // Update the selected task with the edited task
      setEditingTask(editedTask);

      // Update the selected task with the edited task
      setSelectedTask(editedTask);
    };



  /* 
  Couldn't get styles to apply correctly to the sort selection so removing for the time being.
  <select className='form-select nav-item'>
    <option>Order of Creation</option>
    <option>Due Dates</option>
    <option>Completed</option>
  </select>
  */

  return (

    <div className='root-style primary'>
      <nav className='navbar navbar-expand'>
        <div className='container-fluid no-padding'>
          <div className='navbar-brand page-header no-margin'>
            <img src={taskMasterLogo} alt='Silly Little Logo' className='img-fluid' width='100px' height='auto'/>
            MiTask
          </div>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <button className='btn btn-primary secondary border-0 button-work-around' data-bs-toggle='modal' data-bs-target='#add-modal'>Add Task</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className='container-fluid'>

        <div className='p-1 secondary'></div>

        <div className = 'container'>
          <div className='row align-items-start no-margin no-padding'>
            <div className='col text-center'><p>Task Name</p></div>
            <div className='col text-center d-none d-md-block'><p>Due Date</p></div>
            <div className='col text-center d-none d-md-block'><p>Description</p></div>
            <div className='col text-center'><p>Status</p></div>
          </div>
        </div>

        <div className='p-1 secondary'></div>
        
        <div className='container primary no-padding'>
          <TaskList tasks={tasks} onTaskClick={handleTaskClick}/>
        </div>

        <div className='modal fade' data-bs-backdrop="static" id='add-modal'>
          <div className='modal-dialog modal-fullscreen-sm-down modal-lg'>
            <div className='modal-content primary'>
              <div className='modal-header'>
                <h4>Add a New Task</h4>
              </div>
              <div className='modal-body'>
                <TaskAddForm onSave={handleAddTask}/>
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' data-bs-backdrop="static" id='edit-modal'>
          <div className='modal-dialog modal-fullscreen-sm-down'>
            <div className='modal-content primary'>
              <div className='modal-body'>
                {editingTask && <TaskEditForm task={editingTask} onSave={handleSaveEditedTask}/>}
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' data-bs-backdrop="static" id='task-modal'>
          <div className='modal-dialog modal-fullscreen-sm-down'>
            <div className='modal-content primary'>
              <div className='modal-body'>
                {selectedTask && <Task task={selectedTask} onComplete={handleCompleteTask} onEdit={handleEditTask} onDelete={handleDeleteTask}/>}
              </div>
            </div>
          </div>  
        </div>  
        
      </div><div className='primary'></div>
    </div>
  );
};

export default App;