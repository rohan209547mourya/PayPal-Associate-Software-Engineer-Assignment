import React from 'react'

const Signup = () => {

    const [signupObject, setSignupObject] = useState({
        email: '',
        password: '',
        name: ''
    })

    const handleSubmitRequest = (e) => {
        e.preventDefault();

        console.log(loginObject);

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


                console.log(res);

            })
            .catch((err) => {
                console.log(err);

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
        <div>

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
                                    ...loginObject,
                                    name: e.target.value
                                })

                            }}
                        />
                        <span className="placeholder">Enter Email</span>
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
                            value={signupObject.password}
                            onChange={(e) => {

                                setSignupObject({
                                    ...loginObject,
                                    password: e.target.value
                                })

                            }}
                        />
                        <span className="placeholder">Enter Password</span>
                    </label>
                </div>
                <button type="submit">LOGIN</button>
                <div className="newAccount">
                    <p>Don't have an account? <Link to={"/signup"} className='create-one'>Create One</Link></p>
                </div>
            </form>

        </div>
    )
}

export default Signup