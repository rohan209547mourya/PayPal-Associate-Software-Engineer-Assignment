import React, { useState } from 'react'
import ChangeAssignee from './ChangeAssignee'
import '../styles/task.css'
import { fetchFromTaskPlannerApi } from '../utils/api';
import { getjwtToken } from '../utils/setJwtToken';

const TaskCard = ({ id, type, title, description, assignee, status, fetchTasks }) => {

    const [showPopup, setShowPopup] = useState(false);

    const handleAssignTask = () => {
        setShowPopup(true);
    };

    console.log(id, type, title, description, assignee);

    const handleClosePopup = () => {
        setShowPopup(false);
    };



    const handleStatusChangeEvent = (e) => {

        fetchFromTaskPlannerApi(`tasks/${id}/`, "PUT", { status: e.target.value }, {

            'Content-Type': 'application/json',
            'x-auth-token': getjwtToken()
        })
            .then(res => {

                console.log(res);

                if (res.code == 201)
                    toast.success(res.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


            }
            )
            .catch(err => err)

        setTimeout(() => {

            fetchTasks()
        }, 3000)
    }


    return (
        <div className='task'>
            <div className='task-title'>
                <h3 style={{
                    color: `rgb(155, 67, 227)`,
                    fontSize: `15px`,
                    marginTop: `0px`
                }}>
                    {title} : {type}</h3>
                <p>Description: {description}</p>
                <p>Assigned To: {assignee ? assignee.email : "Task is not Assigned Yet"}</p>
            </div>
            <div className='btns'>
                <button className='assign-task' onClick={handleAssignTask}>Assign Task</button>
                {showPopup && <ChangeAssignee handleClose={handleClosePopup} key={id} taskId={id} />}
                <div>

                    {
                        status === "todo" &&
                        (

                            <select className='category-select' onChange={handleStatusChangeEvent}>
                                <option value="todo">TODO</option>
                                <option value="inprogress">In-Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        )
                    }

                    {
                        status === "inprogress" &&
                        (

                            <select className='category-select' onChange={handleStatusChangeEvent}>
                                <option value="inprogress">in-progress</option>
                                <option value="todo">TODO</option>
                                <option value="completed">Completed</option>
                            </select>
                        )
                    }


                    {
                        status === "completed" &&
                        (

                            <select className='category-select' onChange={handleStatusChangeEvent}>
                                <option value="completed">Completed</option>
                                <option value="todo">TODO</option>
                                <option value="inprogresss">In-progress</option>
                            </select>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskCard