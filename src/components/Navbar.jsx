//@ts-check
import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GenresDropDown from './GenresDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';
import { Heart, Menu } from "react-feather";
import { toast } from 'react-hot-toast';
import { changeFilterText } from '../redux/slices/filterSlice';

const Navbar = () => {
    const [ showMenu, setShowMenu ] = useState(false);

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleMenu = useCallback(() => {
        setShowMenu(!showMenu);
    }, [showMenu]);

    const handleKeyDown = useCallback((e) => {
        if(e.key === "Enter") {
            dispatch(changeFilterText(e.target.value));
            if(showMenu) {
                toggleMenu();
            }
        }
    },[changeFilterText, toggleMenu]);

    const handleSignOut = useCallback(() => {
        if(showMenu) {
            toggleMenu();
        }
        dispatch(signOut());
        Cookies.remove('user');
        toast.success("Successfully signed out");
        navigate("/");
    },[signOut]);
    
    return (
        <div className="flex bg-navbg max-sm:flex-col justify-between items-center p-2 h-16 w-full">
            <div className='flex justify-between max-sm:w-full'>
                <div className='flex'>
                    <h2 className="text-white text-2xl mx-2 my-1">Cinefav</h2>
                    {user && <GenresDropDown />}
                </div>
                <div className='hidden max-sm:block'>
                    <button onClick={toggleMenu}><Menu size={30} color='white' /></button>
                </div>
            </div>
            {showMenu && <div className='hidden max-sm:flex flex-col bg-black w-full z-50'>
                {user &&
                    <Link to={"/watchlist"}>
                        <button className='m-2' onClick={toggleMenu}><Heart size={30} color='white' /></button>
                    </Link>
                }
                <input
                    type='text'
                    className='text-white h-10 w-1/2 border-2 border-gray-300 bg-black rounded-lg px-2 m-2'
                    placeholder='Search...'
                    onKeyDown={handleKeyDown}
                />
                {(user && Object.keys(user).length) ?
                    <button
                        className='rounded-lg px-2 bg-red-400 h-btn-height w-1/4 m-2 text-white'
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                    :
                    <Link to={"/signin"}>
                        <button 
                            className='rounded-lg px-2 bg-blue-400 h-btn-height mx-2 my-1 text-white'
                            onClick={toggleMenu}
                        >
                            Sign In
                        </button>
                    </Link>
                }
            </div>}
            <ul className="flex max-sm:hidden justify-center list-none">
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