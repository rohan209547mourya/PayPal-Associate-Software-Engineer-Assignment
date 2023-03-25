import { useState, useEffect } from 'react'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { getjwtToken } from '../utils/setJwtToken'
import { Link, useParams } from 'react-router-dom'
import { uniqueId } from 'lodash'
import '../styles/task.css'
import ChangeAssignee from './ChangeAssignee'
import TaskCard from './TaskCard'

const Task = () => {

    const { sprintId } = useParams()
    const [tasks, setTasks] = useState([])

    const fetchTasks = () => {
        fetchFromTaskPlannerApi(`sprints/${sprintId}/`, "GET", null, {

            'Content-Type': 'application/json',
            'x-auth-token': getjwtToken()
        })
            .then(res => {
                setTasks(res.sprint.tasks)
            })
            .catch(err => err)
    }

    useEffect(() => {
        fetchTasks();
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
                                <TaskCard

                                    key={task._id}
                                    id={task._id}
                                    title={task.title}
                                    description={task.description}
                                    type={task.type}
                                    assignee={task.assignee}
                                    status={task.status}
                                    fetchTasks={fetchTasks}
                                />
                            )
                        )
                    }
                </div>

                <div className='category scroll in-progress'>
                    {
                        tasks.map(task =>
                            task.status === "inprogress" &&
                            (
                                <TaskCard

                                    key={task._id}
                                    id={task._id}
                                    title={task.title}
                                    description={task.description}
                                    type={task.type}
                                    assignee={task.assignee}
                                    status={task.status}
                                    fetchTasks={fetchTasks}
                                />
                            )
                        )

                    }
                </div>

                <div className='category scroll completed'>
                    {
                        tasks.map(task =>
                            task.status === "completed" &&
                            (
                                <TaskCard

                                    key={task._id}
                                    id={task._id}
                                    title={task.title}
                                    description={task.description}
                                    type={task.type}
                                    assignee={task.assignee}
                                    status={task.status}
                                    fetchTasks={fetchTasks}
                                />
                            )
                        )
                    }
                </div>
            </div>

        </div >
    )
}

export default Task