//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import GenresDropDown from './GenresDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { clearMovies, addMovies } from '../redux/slices/movieSlice.js';
import { signOut } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';
import { Heart } from "react-feather";

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log({user})
    },[]);
    const handleSearch = useCallback(async (data) => {
        try {
            const response = await axios.get("/api/movies/search", {
                params: data
            });
            dispatch(clearMovies());
            dispatch(addMovies(response.data.movies));
        } catch (error) {
            console.log({error})
        }
    }, []);

    const handleKeyDown = useCallback((e) => {
        if(e.key === "Enter") {
            handleSubmit(handleSearch)
        }
    },[]);

    const handleSignOut = useCallback(() => {
        dispatch(signOut());
        Cookies.remove('user');
        navigate("/");
    },[]);

    return (
        <div className="flex justify-between p-2 h-16">
            <div className='flex'>
                <h2 className="text-white text-2xl mx-2">Cinefav</h2>
                <GenresDropDown />
            </div>
            <ul className="flex justify-center list-none">
                {user && <li className='text-center mx-2 my-2'><Heart size={30} color='white'/></li>}
                <form className='mx-2' onSubmit={handleSubmit(handleSearch)}>
                    <input 
                        type='text' 
                        className='text-white h-10 border-2 border-gray-300 bg-black rounded-lg p-2' 
                        placeholder='Search...'
                        {...register("searchText")}
                        onKeyDown={handleKeyDown}
                        />
                    <button type='submit' className='hidden' />
                </form>
                <li>
                    {(user && Object.keys(user).length) ?
                        <button 
                            className='rounded-lg p-2 bg-red-400 h-10 text-white'
                            onClick={handleSignOut}
                            >
                            Sign Out
                        </button>
                        :
                        <Link to={"/signin"}>
                            <button className='rounded-lg p-2 bg-blue-400 h-10 text-white'>Sign In</button>
                        </Link>
                    }
                </li>
            </ul>
        </div>
    )
}

export default Navbar