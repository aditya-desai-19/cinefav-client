//@ts-check
import React, { useCallback, useState } from 'react';
import { useForm } from "react-hook-form"
import { Edit } from 'react-feather';

const MovieAddEditForm = ({ onSubmit = () => { }, initialValues = {} }) => {
    const [file, setFile] = useState(null);
    const { register, handleSubmit } = useForm({
        defaultValues: initialValues || {
            title: "",
            description: "",
            imdbRating: "",
            genre: "",
        }
    });

    console.log({initialValues});
    const getImageFileDetails = useCallback((e) => {
        setFile(e.target.files[0]);
    }, [file]);

    const getFormValues = useCallback((values) => {
        const formValues = { ...values, file };
        onSubmit(formValues);
    }, [onSubmit, file]);

    return (
        <form onSubmit={handleSubmit(getFormValues)} encType='multipart/form-data' className='bg-white p-4 flex flex-col justify-evenly items-center h-100p w-100p border-gray-800 border-2'>
            <h3 className='font-bold text-xl'>{initialValues?._id ? "Edit" : "Add"} movie</h3>
            <input 
                className='border-gray-800 border-2 w-90p p-2 rounded-lg' 
                type='text' 
                placeholder='title' 
                {...register("title", { required: true })} 
            />
            <textarea 
                className='border-gray-800 border-2 w-90p p-2 rounded-lg max-h-20' 
                placeholder='description' 
                {...register("description", { required: true })} 
            />
            {initialValues?.poster ?
                <div className='h-20p w-90p flex justify-center'>
                    <img src={file ? URL.createObjectURL(file) : initialValues?.poster} alt="poster" className='h-full w-60p' />
                    <input type='file' id='image-file' hidden onChange={getImageFileDetails} />
                    <label for="image-file" className='m-2 cursor-pointer' title='Edit poster'><Edit size={20} color='black' /></label>
                </div> :
                <div className='flex'>
                    <input type='file' id='image-file' hidden onChange={getImageFileDetails} />
                    <label for='image-file' className='cursor-pointer bg-gray-700 text-white p-2 rounded-lg'>Choose a file</label>
                    <span className='text-black m-2'>{file?.name || "No file choosen"}</span>
                </div>
            }
            <input 
                className='border-gray-800 border-2 w-90p p-2 rounded-lg' 
                type='text' 
                placeholder='rating' 
                {...register("imdbRating", { required: true })} 
            />
            <input 
                className='border-gray-800 border-2 w-90p p-2 rounded-lg' 
                type='text' 
                placeholder='genre' 
                {...register("genre", { required: true })} 
            />
            <button className='bg-blue-400 p-2 rounded-lg text-white' type='submit'>Submit</button>
        </form>
    )
}

export default MovieAddEditForm