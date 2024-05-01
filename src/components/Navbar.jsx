//@ts-check
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

const Navbar = () => {
    const { authToken } = useContext(AuthContext);

    return (
        <div className="flex justify-between p-2 w-full h-10">
            <h2 className="text-gray-800 text-lg">Cinefav</h2>
            <ul className="flex list-none">
                {!authToken && <li>
                    <Link to={"/login"}>
                        <button className='rounded-lg p-2 w-24 bg-blue-400 text-white'>Login</button>
                    </Link>
                </li>}
            </ul>
        </div>
    )
}

export default Navbar