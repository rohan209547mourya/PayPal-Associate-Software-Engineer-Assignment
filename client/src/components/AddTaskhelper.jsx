import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddTaskPopUp from './AddTaskPopUp'

const AddTaskhelper = ({ sprint }) => {


    const { teamId } = useParams()
    const [showPopupTask, setShowPopupTask] = useState(false);

    const handleAddTask = () => {
        setShowPopupTask(true);
    };

    const handleClosePopupTask = () => {
        setShowPopupTask(false);
    };
    return (
        <div className='sprintCard'>
            <div>
                <h4 style={{ marginLeft: '20px' }}>{sprint.title}
                    <br />
                    <span style={{}}>{sprint.description}</span>
                </h4>
            </div>
            <div>
                <div>
                    <span>
                        Open at:  {
                            new Date(sprint.startDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                        }
                    </span>
                </div>
                <div className='btns'>
                    <button className='add-task' onClick={handleAddTask}>Add Task</button>
                    {showPopupTask && <AddTaskPopUp handleClose={handleClosePopupTask} sprintId={sprint._id} />}
                    <Link to={`/tasks/${teamId}/${sprint._id}`} className='view-task'>View Tasks</Link>
                </div>
            </div>
        </div>
    )
}

export default AddTaskhelper