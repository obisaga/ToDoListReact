import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const TodoList = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [editing, setEditing] = useState(null)
    const [editingText, setEditingText] = useState("")
    

    useEffect(() => {
        const retrievedList = localStorage.getItem("items")
        const loadedList  = JSON.parse(retrievedList)

        if(loadedList){
            setTaskList(loadedList)
        }
    }, [])

    
    useEffect(() => {
        const storedList = JSON.stringify(taskList)
        localStorage.setItem("items", storedList)
    }, [taskList])



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
        setEditing(id)
        setEditingText(text)
    }

    return (
        <div>
            <div className="form">
                <input onChange={(e) => setNewTask(e.target.value)} placeholder="Type something..." value={newTask}/>
                <Button variant="dark" onClick={addTask}>ADD</Button>
            </div>
            <div>
                <h2>Tasks for Today:</h2>

                {taskList.map((newTask, index) => {
                    return (                                            
                        <div className="list" key={index}>
                                <Card class="buttonschild">
                            {editing === newTask.id ? 
                            (
                                <div>
                                <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                                value={editingText} /> 
                                <Button className="saveed"variant="light" onClick={() => editTask(newTask.id)}>SAVE EDIT</Button>
                                </div>
                            )
                            :
                            (
                                <div>
                                <p>{newTask.taskName}</p>
                                <Button className="ed"variant="light" onClick={() => handleEdit(newTask.id, newTask.taskName)}>EDIT</Button>
                                </div>
                            )
                            }

                        {/* <input
                            type="checkbox"
                            onClick={() => completeTask(newTask.id)}
                            checked={newTask.completed}/> */}

<div>
                        <Button className="del" variant="danger" onClick={() => deleteTask(newTask.id)}>DELETE</Button>
                        </div>
                        
                        </Card>
                        </div>
                    )
                } ) }

                    </div>
                </div>)
    }
         

export default TodoList