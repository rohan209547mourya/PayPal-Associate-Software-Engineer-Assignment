import React, { useState } from "react";
import { fetchFromTaskPlannerApi } from "../utils/api";
import '../styles/popup.css'
import { getjwtToken } from "../utils/setJwtToken";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

function ChangeAssignee({ handleClose, taskId }) {


    const { teamId, sprintId } = useParams();
    const [email, setEmail] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        const obj = {
            email: email,
            teamId: teamId,
            sprintId: sprintId,
            taskId: taskId
        }

        fetchFromTaskPlannerApi(`tasks/assignee`, "PUT", obj, {
            "Content-Type": "application/json",
            "x-auth-token": getjwtToken()
        })
            .then((res) => {
                if (res) {

                    toast.success("Task has been assigned to user", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
            }
            )
            .catch((err) => {
                if (err.code == 400) {
                    toast.warning(err.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }

                if (err.code == 403) {
                    toast.info(err.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                if (err.code == 404) {
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });

                }
            }
            );

        handleClose()
    };



    return (
        <div className="popup-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="btnClose">
                    <button type="submit">Assign Task</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </form>
        </div>
    );
}

export default ChangeAssignee;
