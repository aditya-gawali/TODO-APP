import React, { useEffect, useState } from 'react'

const Modal = ({ id, close }) => {

    const [getTask, setGetTask] = useState([]);
    const [task, setTask] = useState();


    const fetchSingleTask = async () => {
        const res = await fetch(`http://localhost:3000/api/todo/${id}`);
        const data = await res.json();
        await setGetTask(data);
        await setTask(data.task);
    }

    useEffect(() => {
        fetchSingleTask();

    }, [id]);



    const updateHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });

        if (response.ok) {
            console.log('Task updated Successfully');
        } else {
            console.error('Failed to update Task');
        }

        close();
    }

    return (
        <div className='w-full h-screen bg-slate-900 absolute bg-opacity-90 z-10 top-0 flex items-center justify-center'>
            <div className='flex flex-col gap-4 p-6 md:p-8 bg-slate-800 rounded-lg mx-10 w-full md:w-1/2'>
                <h1 className='text-xl md:text-3xl font-bold px-2'>Update Task</h1>
                <form className='flex flex-col gap-3 items-center justify-between' onSubmit={updateHandler}>
                    <input type="text"
                        name="task"
                        value={task}
                        onChange={(e) => { setTask(e.target.value) }}
                        className='p-2 md:p-4 w-full bg-slate-700 rounded-lg px-3 text-lg md:text-2xl'
                        required />
                    <div className='w-full flex flex-row justify-between gap-4'>

                        <input type='submit' value="Update Task" className='w-full bg-green-700 p-2 md:p-4 px-3 md:px-5 text-xl rounded-lg font-bold hover:bg-green-600' />
                        <input type='button' value="Close" onClick={close} className='w-full bg-red-700 p-2 md:p-4 px-3 md:px-5 text-xl rounded-lg font-bold hover:bg-red-600' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
