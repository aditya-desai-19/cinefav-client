//@ts-check
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'

const SignIn = () => {
    const [isformSubmit, setIsFormSubmit] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset();
    }, [isformSubmit]);

    const onSubmit = async (data) => {
        try {
            setIsFormSubmit(true);
            const response = await axios.post("/api/signin", data);
            console.log({response})
        } catch (error) {
            console.log({error})
        }
    }

    return (
        <div className='flex justify-center items-center h-full mt-28'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col bg-blue-300 justify-between items-center border-2 border-gray-400 w-1/4 p-2 h-60'>
                <input
                    {...register("username", { required: true })}
                    className='border-2 border-gray-400 w-3/4'
                    placeholder='Username'
                />
                <input
                    type='email'
                    {...register("email", { required: true })}
                    className='border-2 border-gray-400 w-3/4'
                    placeholder='Email'
                />
                <input
                    type='password'
                    {...register("password", { required: true, minLength: 6 })}
                    className='border-2 border-gray-400 w-3/4'
                    placeholder='Password'
                />
                <button type='submit' className='bg-blue-600 p-2 m-1 text-white w-24 rounded-lg'>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn