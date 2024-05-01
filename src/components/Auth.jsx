//@ts-check
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { authBaseURL, baseURL } from '../utils/constants';
import Cookies from 'js-cookie';
import AuthContext from '../utils/AuthContext';

const Auth = ({isLogin}) => {
    const [isformSubmit, setIsFormSubmit] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { handleToken } = useContext(AuthContext);

    useEffect(() => {
        reset();
    }, [isformSubmit]);

    const onSubmit = async (data) => {
        try {
            setIsFormSubmit(true);
            const apiRoute = `${baseURL}/${authBaseURL}/${isLogin ? "login" : "signin"}`;
            const navigationRoute = `${isLogin ? "/" : baseURL + "/login"}`;
            const response = await axios.post(apiRoute, data);
            if(response.status === 200) {
                if(isLogin) {
                    const token = response.data.token;
                    Cookies.set("authToken", token);
                    handleToken(token)
                }
                navigate(navigationRoute);
            }
        } catch (error) {
            console.log({error})
        }
    }

    return (
        <div className='flex justify-center items-center h-full mt-28'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col bg-blue-300 justify-between items-center border-2 border-gray-400 w-1/4 p-2 h-60 shadow-lg'>
                <h2 className='text-xl text-white'>Cinefav</h2>
                {!isLogin && <input
                    {...register("username", { required: true })}
                    className='border-2 border-gray-400 w-3/4'
                    placeholder='Username'
                />}
                <input
                    type={isLogin ? 'text' : 'email'}
                    {...register(`${isLogin ? "userNameOrEmail" : "email"}`, { required: true })}
                    className='border-2 border-gray-400 w-3/4'
                    placeholder={isLogin ? "Username or Email" : "Email"}
                />
                <input
                    type='password'
                    {...register("password", { required: true, minLength: 6 })}
                    className='border-2 border-gray-400 w-3/4'
                    placeholder='Password'
                />
                <button type='submit' className='bg-blue-600 p-2 m-1 text-white w-24 rounded-lg'>{isLogin ? "Login" : "Sign In"}</button>
                {isLogin && <Link to="/signin">New user? Sign in</Link>}
            </form>
        </div>
    )
}

export default Auth