import { useState } from 'react';
import TaskList from './TaskList';

const TaskSearch = ({onTaskClick}) => {
    const [usernameToSearch, setUsernameToSearch] = useState("");
    const [retrievedTasks, setRetrievedTasks] = useState([]);

    const handleClearTasks = () => {
        // Clear the retrieved tasks
        setRetrievedTasks([]);
    };

    const handleUsernameSearch = async () => {
        if (usernameToSearch) {
            try {
                const response = await fetch(`http://localhost:5267/api/tasks/byUsername/${encodeURIComponent(usernameToSearch)}`);
                if (response.ok) {
                    const tasks = await response.json();
                    setRetrievedTasks(tasks);
                    // Process the tasks as needed
                    console.log(tasks);
                } else {
                    console.error('Failed to fetch tasks by username');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        }
    };

    return (
        <div>
            <input
                type = "text"
                placeholder = "Search tasks by Username"
                value = {usernameToSearch}
                onChange = {(e) => setUsernameToSearch(e.target.value)}
            ></input>

            <button onClick = {handleUsernameSearch}>Search</button>

            <div>
                <h2>Retrieved Tasks:</h2>
                {retrievedTasks.length > 0 && (
                    <>
                        <TaskList tasks = {retrievedTasks} onTaskClick = {onTaskClick}/>
                        <button onClick={handleClearTasks}>Clear Tasks</button>
                    </>
                )}
            </div>
        </div>
    );
};
 
export default TaskSearch;