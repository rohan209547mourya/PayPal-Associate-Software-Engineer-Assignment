import React, { useState } from "react";
import { fetchFromTaskPlannerApi } from "../utils/api";
import '../styles/popup.css'
import { getjwtToken } from "../utils/setJwtToken";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function AddTaskPopUp({ handleClose, sprintId }) {
    const [requestObject, setRequestObject] = useState({
        title: '',
        description: '',
        type: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const obj = {
            title: requestObject.title,
            description: requestObject.description,
            type: requestObject.type
        }

        fetchFromTaskPlannerApi(`tasks/${sprintId}`, "POST", obj, {
            "Content-Type": "application/json",
            "x-auth-token": getjwtToken()
        })
            .then((res) => {

                if (res.code == 201) {
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

                if (res.code == 400) {
                    toast.warning(res.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }

                if (res.code == 403) {
                    toast.info(res.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                if (res.code == 404) {
                    toast.error(res.message, {
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


        handleClose();
    };

    return (
        <div className="popup-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Task title:</label>
                <input
                    type="text"
                    id="name"
                    value={requestObject.title}
                    onChange={(e) =>
                        setRequestObject({
                            ...requestObject,
                            title: e.target.value
                        })
                    }
                />
                <br />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={requestObject.description}
                    onChange={(e) =>

                        setRequestObject({
                            ...requestObject,
                            description: e.target.value
                        })

                    }
                />

                <br />
                <label htmlFor="type">Type:</label>
                <select onChange={(e) => {
                    setRequestObject({
                        ...requestObject,
                        type: e.target.value
                    })
                }}>
                    <option value="">Select</option>
                    <option value="story">Story</option>
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                </select>


                <div className="btnClose">
                    <button type="submit">Create Task</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </form>
        </div>
    );
}

export default AddTaskPopUp;
