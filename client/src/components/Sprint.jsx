import '../styles/sprint.css'
import { useState, useEffect } from 'react'
import CreateNewSprint from './CreateNewSprint'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { getjwtToken } from '../utils/setJwtToken'
import { useParams } from 'react-router-dom'
import { uniqueId } from 'lodash'

const Sprint = () => {

    const { teamId } = useParams()
    const [showPopup, setShowPopup] = useState(false);

    const handleAddSprint = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [sprints, setSprints] = useState([])


    useEffect(() => {
        fetchFromTaskPlannerApi(`teams/${teamId}/sprints`, "GET", null, {

            'Content-Type': 'application/json',
            'x-auth-token': getjwtToken()
        })
            .then(res => {
                console.log(res);
                setSprints(res.sprints)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <div className='sprint-header'>
                <div>
                    <h2>Sprint</h2>
                </div>
                <div>
                    <button className='add-sprint' onClick={handleAddSprint}>ADD SPRINT</button>
                    {showPopup && <CreateNewSprint handleClose={handleClosePopup} teamId={teamId} />}
                </div>
            </div>

            {

                !sprints.length > 0 ? <h1 style={{ width: '40%', margin: 'auto', marginTop: '50px' }}>Your Team dont have any sprint.</h1>
                    :
                    <div className='sprints'>
                        {
                            sprints.map(sprint => {
                                console.log(sprint);
                                return (
                                    <div className='sprintCard' key={uniqueId()}>
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
                                                <button className='add-task'>Add Task</button>
                                                <button className='view-task'>View Tasks</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>

    )
}

export default Sprint