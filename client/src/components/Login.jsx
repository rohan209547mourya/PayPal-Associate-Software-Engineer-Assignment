import React from 'react'

const Login = () => {

    return (
        <div>
            <form>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={() => { }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={() => { }}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login