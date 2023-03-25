import '../styles/team.css'
import React, { useState } from "react";
import AddMemberPopup from "./AddMemberPopup";
import { Link } from 'react-router-dom';

const Team = ({ id, title, description, createdAt }) => {

    const [showPopup, setShowPopup] = useState(false);

    const handleAddMember = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <div className='teamCard'>
            <div>
                <div>
                    <h3>{title}</h3>
                </div>
                <div>
                    <p>{description}</p>
                </div>
                <div>
                    <p>Create At: {

                        new Date(createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })

                    }
                    </p>
                </div>
            </div>
            <div className='btns'>
                <button className='addMember' onClick={handleAddMember}>Add Member</button>
                {showPopup && <AddMemberPopup handleClose={handleClosePopup} teamId={id} />}
                <div>
                    <Link to={`/sprints/${id}`} className='viewSprints' >View Sprints</Link>
                </div>
            </div>
        </div>
    )
}

export default Team