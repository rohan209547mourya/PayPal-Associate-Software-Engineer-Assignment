import React, { useState } from 'react'
import { fetchFromTaskPlannerApi } from '../utils/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css'
import { Link } from 'react-router-dom'
import { setJwtToken, getjwtToken } from '../utils/setJwtToken';
import { useNavigate } from 'react-router-dom';


const Login = () => {


    const navigate = useNavigate();

    const [loginObject, setLoginObject] = useState({
        email: '',
        password: ''
    })

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        fetchFromTaskPlannerApi('auth/login', 'POST', loginObject)
            .then((res) => {

                if (res.code !== 200) {
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

                if (res.code == 200) {

                    setJwtToken(res.token)

                    toast.success(res.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    navigate('/home')

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
        <div className='login'>
            <form onSubmit={handleSubmitRequest}>
                <div>
                    <label className="custom-field input">
                        <input
                            type="email"
                            name="email"
                            autoComplete='off'
                            value={loginObject.email}
                            onChange={(e) => {

                                setLoginObject({
                                    ...loginObject,
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
                            value={loginObject.password}
                            onChange={(e) => {

                                setLoginObject({
                                    ...loginObject,
                                    password: e.target.value
                                })

                            }}
                        />
                        <span className="placeholder">Enter Password</span>
                    </label>
                </div>
                <button className='loginBtn' type="submit">LOGIN</button>
                <div className="newAccount">
                    <p>Don't have an account? <Link to={"/signup"} className='create-one'>Create One</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login