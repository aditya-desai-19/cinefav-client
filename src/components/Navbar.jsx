//@ts-check
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import GeneresDropDown from './GeneresDropDown';

const Navbar = () => {
    const { register, handleSubmit } = useForm();

    const handleSearch = useCallback(async (data) => {
        try {
            console.log(data)
            const response = await axios.get("/api/search", {
                params: data
            });
            console.log({response})
        } catch (error) {
            console.log({error})
        }
    }, []);

    const handleKeyDown = useCallback((e) => {
        if(e.key === "Enter") {
            handleSubmit(handleSearch)
        }
    },[]);

    return (
        <div className="flex justify-between p-2 h-16">
            <div className='flex'>
                <h2 className="text-white text-2xl mx-2">Cinefav</h2>
                <GeneresDropDown />
            </div>
            <ul className="flex justify-center list-none">
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
                    <Link to={"/signin"}>
                        <button className='rounded-lg p-2 bg-blue-400 h-10 text-white'>Sign In</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar