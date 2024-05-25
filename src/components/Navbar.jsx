//@ts-check
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="flex justify-between p-2 h-16">
            <h2 className="text-gray-800 text-lg">Cinefav</h2>
            <ul className="flex list-none">
                <li>
                    <Link to={"/signin"}>
                        <button className='rounded-lg p-2 w-24 bg-blue-400 text-white'>Sign In</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar