import React, { useEffect, useState } from 'react'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { getjwtToken } from '../utils/setJwtToken'
import Team from './Team'
import '../styles/home.css'
import { uniqueId } from 'lodash'
import CreateNewTeamPopup from './CreateNewTeamPopup'

const Home = () => {

    const [showPopup, setShowPopup] = useState(false);

    const handleAddMember = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [teams, setTeam] = useState([])




    useEffect(() => {
        fetchFromTaskPlannerApi('users/teams', "GET", null, {

            'Content-Type': 'application/json',
            'x-auth-token': getjwtToken()
        })
            .then(res => {
                setTeam(res.teams)
            })
            .catch(err => console.log(err))
    }, [])


    const teamsErrorMessage = <h1>Your Not in Any Team</h1>


    return (
        <div>
            <div className='team-container'>
                <div className='team-header'>
                    <div>
                        <h2>Teams</h2>
                    </div>
                    <div>
                        <button className='add-team' onClick={handleAddMember}>CREATE TEAM</button>
                        {showPopup && <CreateNewTeamPopup handleClose={handleClosePopup} setTeams={setTeam} teams={teams} />}
                    </div>
                </div>
                <div className='teams'>
                    {

                        teams.length > 0 ? teams.map(team => {
                            return (
                                <Team
                                    key={uniqueId()}
                                    id={team._id}
                                    title={team.name}
                                    description={team.description}
                                    createdAt={team.createAt}
                                />
                            )
                        })
                            :
                            teamsErrorMessage
                    }
                </div>
            </div>
        </div>
    )
}

export default Home