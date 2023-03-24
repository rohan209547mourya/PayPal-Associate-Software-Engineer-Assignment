import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/signup.css'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();

    const [signupObject, setSignupObject] = useState({
        email: '',
        password: '',
        name: ''
    })

    const handleSubmitRequest = (e) => {
        e.preventDefault();

        console.log(signupObject);

        fetchFromTaskPlannerApi('users/register', 'POST', signupObject)
            .then((res) => {

                if (res.code !== 201) {
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

                    navigate('/')
                }
            })
            .catch((err) => {

                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    return (
        <div className='signup'>

            <form onSubmit={handleSubmitRequest}>

                <div>
                    <label className="custom-field input">
                        <input
                            type="name"
                            name="name"
                            autoComplete='off'
                            value={signupObject.name}
                            onChange={(e) => {

                                setSignupObject({
                                    ...signupObject,
                                    name: e.target.value
                                })

                            }}
                        />
                        <span className="placeholder">Enter Name</span>
                    </label>
                </div>
                <div>
                    <label className="custom-field input">
                        <input
                            type="email"
                            name="email"
                            autoComplete='off'
                            value={signupObject.email}
                            onChange={(e) => {

                                setSignupObject({
                                    ...signupObject,
                                    email: e.target.value
                                })

                            }}
                        />
                        <span className="placeholder">Enter Email</span>
                    </label>
                </div>

                <div>
                    <label className="custom-field input">
                        <input
                            type="password"
                            name="password"
                            autoComplete='off'
                            value={signupObject.password}
                            onChange={(e) => {

                                setSignupObject({
                                    ...signupObject,
                                    password: e.target.value
                                })

                            }}
                        />
                        <span className="placeholder">Enter Password</span>
                    </label>
                </div>
                <button className='signupBtn' type="submit">SIGNUP</button>
                <div className="alreadyAccount">
                    <p>Already have an account? <Link to={"/"} className='login'>Login</Link></p>
                </div>
            </form>

        </div>
    )
}

export default Signup