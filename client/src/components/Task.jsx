import { useState, useEffect } from 'react'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { getjwtToken } from '../utils/setJwtToken'
import { Link, useParams } from 'react-router-dom'
import { uniqueId } from 'lodash'
import '../styles/task.css'
import ChangeAssignee from './ChangeAssignee'

const Task = () => {

    const { sprintId } = useParams()
    const [showPopup, setShowPopup] = useState(false);

    const handleAssignTask = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchFromTaskPlannerApi(`sprints/${sprintId}/`, "GET", null, {

            'Content-Type': 'application/json',
            'x-auth-token': getjwtToken()
        })
            .then(res => {
                console.log(res.sprint.tasks);
                setTasks(res.sprint.tasks)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <div className="header">
                <h2>Tasks</h2>
                {/* <div>
                </div> */}
            </div>

            <div style={{
                width: '70%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'space-between'

            }}>
                <h2>TODO</h2>
                <h2>In-Progress</h2>
                <h2>Completed</h2>
            </div>

            <div className='task-category'>
                <div className='category scroll to-do'>
                    {
                        tasks.map(task =>
                            task.status === "todo" &&
                            (
                                <div className='task' key={uniqueId()}>
                                    <div className='task-title'>
                                        <h3 style={{
                                            color: `rgb(155, 67, 227)`,
                                            fontSize: `15px`,
                                            marginTop: `0px`
                                        }}>
                                            {task.title} : {task.type}</h3>
                                        <p>Description: {task.description}</p>
                                        <p>Assigned To: {task.assignee ? task.assignee.email : "Task is not Assigned Yet"}</p>
                                    </div>
                                    <div className='btns'>
                                        <button className='assign-task' onClick={handleAssignTask}>Assign Task</button>
                                        {showPopup && <ChangeAssignee handleClose={handleClosePopup} taskId={task._id} />}
                                        <button className='change-status'>Change Status</button>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>

                <div className='category scroll in-progress'>
                    {
                        tasks.map(task =>
                            task.status === "inprogress" &&
                            (
                                <div className='task' key={uniqueId()}>
                                    <div className='task-title'>
                                        <h3>{task.title}</h3>
                                    </div>
                                </div>
                            )
                        )

                    }
                </div>

                <div className='category scroll completed'>
                    {
                        tasks.map(task =>
                            task.status === "completed" &&
                            (
                                <div className='task' key={uniqueId()}>
                                    <div className='task-title'>
                                        <h3>{task.title}</h3>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>

        </div >
    )
}

export default Task