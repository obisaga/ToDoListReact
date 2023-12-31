import React from 'react';
import { useState } from 'react';

const Task = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [editing, setEditing] = useState(null)
    const [editingText, setEditingText] = useState("")



    const addTask = () => {
        const task = {
            id: Date.now(),
            taskName: newTask,
            completed: false
        }
        setTaskList([...taskList, task]);
    }

    const deleteTask = (id) => {
        setTaskList(taskList.filter((task) => task.id !== id))
    }

    const editTask = (id) => {
        const updatedTask = [...taskList].map((newTask) => {
            if (newTask.id === id) {
                newTask.taskName = editingText
            }
            return newTask
        })
        setTaskList(updatedTask);
        setEditing(null);
        setEditingText("");
    }

    const completeTask = () => {
        setTaskList(
            taskList.map((newTask) => {
                if (newTask.id === id) {
                    return { ...newTask, completed: true }
                } else {
                    return newTask
                }
            })
        )
    }

    const handleEdit = (id, text) => {
        setEditing(id);
        setEditingText(text)

    }

    return (
        <div>
            <div>
                <input onChange={(e) => setNewTask(e.target.value)} placeholder="Type something..." value={newTask}/>
                <button onClick={addTask}>ADD</button>
            </div>
            <div>
                <h2>Task</h2>

                {taskList.map((newTask, index) => {
                    return (                                            
                        <div key={index}>

                            {editing === newTask.id ? 
                            (
                                <div>
                                <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                                value={editingText} /> 
                                <button onClick={() => editTask(newTask.id)}>SAVE EDIT</button>
                                </div>
                            )
                            :
                            (
                                <div>
                                <p>{newTask.taskName}</p>
                                <button onClick={() => handleEdit(newTask.id, newTask.taskName)}>EDIT</button>
                                </div>
                            )
                            }

                        {/* <input
                            type="checkbox"
                            onClick={() => completeTask(newTask.id)}
                            checked={newTask.completed}/> */}

                        <button onClick={() => deleteTask(newTask.id)}>DELETE</button>
                        </div>
                    )
                } ) }

                    </div>
                </div>)
    }
         

export default Task