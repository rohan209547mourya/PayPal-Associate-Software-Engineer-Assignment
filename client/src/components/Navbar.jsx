import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../styles/navbar.css'


const Navbar = () => {

    const links = [
        {
            id: 1,
            url: '/home',
            text: 'home'
        },
        {
            id: 2,
            url: '/sprints',
            text: 'Sprints'
        },
    ]

    return (
        <nav className='navbar'>
            <div className='logo'>
                <img src={logo} />
            </div>

            <div>

                <ul>
                    {
                        links.map(link => {
                            return (
                                <li>
                                    <Link key={link.id} to={link.url}>{link.text}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </nav>
    )
}

export default Navbar