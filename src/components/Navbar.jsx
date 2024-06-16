//@ts-check
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GenresDropDown from './GenresDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';
import { Heart } from "react-feather";
import { toast } from 'react-hot-toast';
import { changeFilterText } from '../redux/slices/filterSlice';

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKeyDown = useCallback((e) => {
        if(e.key === "Enter") {
            dispatch(changeFilterText(e.target.value));
        }
    },[changeFilterText]);

    const handleSignOut = useCallback(() => {
        dispatch(signOut());
        Cookies.remove('user');
        toast.success("Successfully signed out");
        navigate("/");
    },[signOut]);

    return (
        <div className="flex justify-between items-center p-2 h-16">
            <div className='flex'>
                <h2 className="text-white text-2xl mx-2 my-1">Cinefav</h2>
                {user && <GenresDropDown />}
            </div>
            <ul className="flex justify-center list-none">
                {user &&
                    <Link to={"/watchlist"}>
                        <li className='text-center mx-2 my-2'><Heart size={30} color='white' /></li>
                    </Link>
                }
                <input 
                    type='text' 
                    className='text-white h-10 border-2 border-gray-300 bg-black rounded-lg px-2 my-1 mx-2' 
                    placeholder='Search...'
                    onKeyDown={handleKeyDown}
                    />
                <li>
                    {(user && Object.keys(user).length) ?
                        <button 
                            className='rounded-lg px-2 bg-red-400 h-btn-height mx-2 my-1 text-white'
                            onClick={handleSignOut}
                            >
                            Sign Out
                        </button>
                        :
                        <Link to={"/signin"}>
                            <button className='rounded-lg px-2 bg-blue-400 h-btn-height mx-2 my-1 text-white'>Sign In</button>
                        </Link>
                    }
                </li>
            </ul>
        </div>
    )
}

export default Navbar