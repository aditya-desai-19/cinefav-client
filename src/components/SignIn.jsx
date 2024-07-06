//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/slices/userSlice'
import { toast } from 'react-hot-toast'

const SignIn = ({ isSignIn }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isformSubmit, setIsFormSubmit] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset();
    }, [isformSubmit]);

    const onSubmit = useCallback(async (data) => {
        try {
            const api = `/api/users/${isSignIn ? 'signin' : 'signup'}`;
            setIsFormSubmit(true);
            const response = await axios.post(api, data);
            if (response.status === 200 || response.status === 201) {
                if (isSignIn) {
                    const token = response.data.token;
                    if(token) {
                        Cookies.set('token', token, { expires: 1});
                        const decoded = jwtDecode(token);
                        if(decoded && Object.keys(decoded).length) {
                            const user = {
                                id: decoded?.user?.id,
                                name: decoded?.user?.name,
                                role: decoded?.user?.role
                            };
                            Cookies.set('user', JSON.stringify(user), {expires: 1});
                            dispatch(signIn(user))
                            navigate("/movies")
                        } else {
                            toast.error("Some error occurred");
                            throw new Error("Some error occurred");
                        }
                    }
                } else {
                    toast.success("Successfully signed up");
                    navigate("/signin");
                }
            }
        } catch (error) {
            console.log({ error })
        }
    }, [isSignIn]);

    const toggleSignIn = useCallback(() => {
        if (isSignIn) {
            navigate("/signup");
        } else {
            navigate("/signin");
        }
    }, [isSignIn]);

    return (
        <div className='flex justify-center items-center h-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between items-center bg-formbg  border-2 border-gray-400 w-40p p-2 h-50p max-md:w-70p max-md:h-50p max-xsm:h-40p'>
                <h2 className='text-2xl text-white my-4'>{isSignIn ? "Sign In" : "Sign Up"}</h2>
                <div className='w-full flex flex-col items-center'>
                    {!isSignIn && <input
                        {...register("userName", { required: true })}
                        className='border-2 border-gray-400 w-3/4 my-4'
                        placeholder='Username'
                    />}
                    <input
                        type={`${isSignIn ? 'text' : 'email'}`}
                        {...register(`${isSignIn ? 'userNameOrEmail' : 'email'}`, { required: true })}
                        className='border-2 border-gray-400 w-3/4 my-4'
                        placeholder='Email'
                    />
                    <input
                        type='password'
                        {...register("password", { required: true, minLength: 6 })}
                        className='border-2 border-gray-400 w-3/4 my-4'
                        placeholder='Password'
                    />
                </div>
                <div className='w-full flex flex-col items-center'>
                    <button type='submit' className='bg-blue-600 p-2 m-1 text-white w-24 rounded-lg my-4'>{isSignIn ? "Sign In" : "Sign Up"}</button>
                    <p className='text-white'>
                        {isSignIn ? "New user? " : "Already a user? "}
                        <span className='cursor-pointer' onClick={toggleSignIn}>
                            {!isSignIn ? "Sign In" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignIn