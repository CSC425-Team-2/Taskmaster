import React, { useState } from 'react';
import TaskList from './TaskList';
import Task from './Task';
import Popup from 'reactjs-popup';
import TaskEditForm from './TaskEditForm';
import TaskAddForm from './TaskAddForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [addingTask, setAddingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (newTask) => {
    // Create a new task with a unique ID and mark it as not completed
    const task = { ...newTask, id: tasks.length + 1, completed: false };
    setTasks([...tasks, task]);
    
    setAddingTask(null);
  };

  const handleTaskClick = (taskId) => {
    // Find and select the clicked task
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task);
  };

  const handleCompleteTask = (task) => {
    // Set the task complete or incomplete
    task.completed = !task.completed;
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleEditTask = (editedTask) => {
    // Update the selected task with the edited task
    setEditingTask(editedTask);
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
    setTasks(tasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  const handleCloseTask = () => {
    // Close the current task
    setSelectedTask(null);
  };

  return (
    <div>
      <h1>TaskMaster</h1>
      <button id='button' onClick={() => {setAddingTask(true)}}>New Task</button>
      <button id='button' onClick={() => {}}>Sort</button>
      <hr className='divider-line' />
      <div className='top-container'>
        <div id='col1'><p>Task Name</p></div>
        <div id='col2'><p>Due Date</p></div>
        <div id='col3'><p>Description</p></div>
        <div id='col4'><p>Status</p></div>
      </div>
      <hr className='divider-line' />
      <div className='bottom-container'>

      <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
      </div>
      {addingTask && (
        <Popup open modal nested closeOnDocumentClick onClose={() => setAddingTask(null)}>
          {(close) => (
            <TaskAddForm
              onSave={handleAddTask}
              onCancel={() => {
                setAddingTask(null);
                close();
              }}
            />
          )}
        </Popup>)}

      {selectedTask && (
        <Popup open modal nested closeOnDocumentClick onClose={() => setSelectedTask(null)}>
        {(close) => (
          <Task
          task={selectedTask}
          onComplete={handleCompleteTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onClose={handleCloseTask}
        />
        )}
      </Popup>)}
        
      {editingTask && (
        <Popup open modal nested closeOnDocumentClick onClose={() => setEditingTask(null)}>
          {(close) => (
            <TaskEditForm
              task={editingTask}
              onSave={handleSaveEditedTask}
              onCancel={() => {
                setEditingTask(null);
                close();
              }}
            />
          )}
        </Popup>
      )}
    </div>
  );
};

export default App;
