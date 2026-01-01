import React, { useEffect, useState } from 'react'
import Modal from './Modal'


const Todo = () => {
    const [task, setTask] = useState("");
    const [getTask, setGetTask] = useState([]);
    const [modal, setModal] = useState(false);
    const [taskId, setTaskId] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch("https://todo-app-backend-9uh4.onrender.com/api/todo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });

        if (response.ok) {
            console.log('Task Added Successfully');
        } else {
            console.error('Failed to Add Task');
        }


        setTask("")
    }

    const fetchTask = async () => {
        const res = await fetch("https://todo-app-backend-9uh4.onrender.com/api/todo");
        const data = await res.json();
        await setGetTask(data);
    }

    const deleteHandler = async (e) => {
        // if (confirm("Are you sure to delete..")) {
        const deleteTask = await fetch(`https://todo-app-backend-9uh4.onrender.com/api/todo/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await (deleteTask) ? console.log("task Deleted..") : console.log("error for delete...")
        // }
    }

    useEffect(() => {
        fetchTask();

    }, [setTask, deleteHandler]);

    const openModal = (e) => {
        setModal(true)
        setTaskId(e.target.id);
    }
    const closeModal = (e) => {
        setModal(false)
        setTaskId("");
    }
    return (
        <>
            <div className='mx-5 md:mx-20 bg-slate-800 rounded-lg h-full my-10 px-5 py-5 flex flex-col gap-6'>
                <div>
                    <form onSubmit={submitHandler} className='flex flex-col md:flex-row gap-3 items-center justify-between '>
                        <input type="text"
                            name="task"
                            className='p-4 w-full bg-slate-700 rounded-lg px-3 text-lg md:text-2xl'
                            value={task}
                            placeholder='Enter Your New Task'
                            onChange={(e) => { setTask(e.target.value) }}
                            required />
                        <input type='submit' value="Add Task" className='bg-green-700 p-2 md:p-4 px-3 md:px-5 text-xl rounded-lg font-bold hover:bg-green-600' />
                    </form>
                </div>

                <div className='h-full flex flex-col gap-4'>
                    <h1 className='text-2xl md:text-3xl px-2'>Tasks</h1>

                    {
                        (getTask.length == 0) ? (<div className='px-5 flex items-center p-4 bg-slate-700 rounded-lg justify-center gap-4'>

                            <h1 className='text-2xl font-bold'>No Task </h1>
                        </div>) : (

                            getTask.map((t, i) => {
                                return < div className='px-5 flex items-center p-4 bg-slate-700 rounded-lg justify-between gap-4' key={i}>

                                    <h1 className='text-xl md:text-2xl font-bold'>{t.task}</h1>
                                    <div className='flex gap-2 md:gap-6 text-xl md:text-3xl'>
                                        <i className="ri-edit-line text-blue-600 hover:cursor-pointer hover:text-blue-500" id={t._id} onClick={openModal}></i>
                                        <i className="ri-delete-bin-4-line text-red-600 hover:cursor-pointer hover:text-red-500" id={t._id} onClick={deleteHandler}></i>
                                    </div>
                                </div>
                            })
                        )
                    }

                </div>
            </div >


            {
                (modal) ? <Modal id={taskId} close={closeModal} /> : ""
            }



        </>
    )
}

export default Todo
