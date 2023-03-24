import React, { useState } from "react";
import { fetchFromTaskPlannerApi } from "../utils/api";
import '../styles/popup.css'
import { getjwtToken } from "../utils/setJwtToken";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMemberPopup({ teamId, handleClose }) {


    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const obj = {
            email: email
        }

        fetchFromTaskPlannerApi(`teams/${teamId}/member`, "POST", obj, {
            "Content-Type": "application/json",
            "x-auth-token": getjwtToken()
        })
            .then((res) => {

                if (res) {
                    toast.success("User has been added to the team.", {
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
                        pauseOnHover: true,
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
                    <button type="submit">Add Member</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </form>
        </div>
    );
}

export default AddMemberPopup;
