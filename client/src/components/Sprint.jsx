import '../styles/sprint.css'
import { useState, useEffect } from 'react'
import CreateNewSprint from './CreateNewSprint'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { getjwtToken } from '../utils/setJwtToken'
import { Link, useParams } from 'react-router-dom'
import AddTaskhelper from './AddTaskhelper'

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


    const fetchSprints = () => {

        fetchFromTaskPlannerApi(`teams/${teamId}/sprints`, "GET", null, {

            'Content-Type': 'application/json',
            'x-auth-token': getjwtToken()
        })
            .then(res => {
                setSprints(res.sprints)
            })
            .catch(err => err.message)
    }





    useEffect(() => {
        fetchSprints();
    }, [])


    return (
        <div>
            <div className='sprint-header'>
                <div>
                    <h2>Sprint</h2>
                </div>
                <div>
                    <button className='add-sprint' onClick={handleAddSprint}>ADD SPRINT</button>
                    {showPopup && <CreateNewSprint fetchSprints={fetchSprints} handleClose={handleClosePopup} teamId={teamId} />}
                </div>
            </div>

            {

                !sprints.length > 0 ? <h1 style={{ width: '40%', margin: 'auto', marginTop: '50px' }}>Your Team dont have any sprint.</h1>
                    :
                    <div className='sprints'>
                        {
                            sprints.map(sprint => {
                                return (
                                    <AddTaskhelper
                                        key={sprint._id}
                                        sprint={sprint}
                                    />
                                )
                            })
                        }
                    </div>
            }
        </div>

    )
}

export default Sprint