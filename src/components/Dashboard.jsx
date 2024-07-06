//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { callMovieApi } from '../utils/movieApi';
import { addMovies, clearMovies } from '../redux/slices/movieSlice';
import WarningPopup from './WarningPopup';
import axiosInstance from '../utils/api';

const Dashboard = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const currentUser = useSelector((state) => state.user.user);
    const movies = useSelector((state) => state.movie.movies);

    const dispatch = useDispatch();

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        // console.log({movies});
    }, [movies]);

    useEffect(() => {
        console.log({currentUser});
        if(!currentUser) {
            const message = "Please login...";
            toast.error(message);
            setErrorMessage(message);
        } else {
            if(currentUser?.role !== "ADMIN") {
                const message = "Unauthorized! You don't have permission to access this page";
                toast.error(message);
                setErrorMessage(message);
            }
        }
    }, [currentUser]);

    const getMovies = useCallback(async () => {
        const movies = await callMovieApi();
        dispatch(clearMovies());
        dispatch(addMovies(movies));
    }, [callMovieApi, clearMovies, addMovies]);

    const onEdit = useCallback((movie) => {
        //show modal to edit
    }, []);

    const onDelete = useCallback((movieId) => {
        toast.custom(
            (t) => (
                <WarningPopup
                    message={"Are you sure you want to delete movie?"}
                    onSuccess={() => {
                        callDeleteApi(movieId);
                        toast.dismiss(t.id);
                    }}
                    onDismiss={() => {
                        toast.dismiss(t.id);
                    }}
                />
            ),
            {
                duration: Infinity, 
            }
        );
    }, []);

    const callDeleteApi = useCallback(async (movieId) => {
        try {
            const response = await axiosInstance.delete("/api/movie")
        } catch (error) {
            
        }
    }, []);

    return (
        <div className='h-full'>
            {currentUser?.role === "ADMIN"
                ?
                <div className='h-full w-full overflow-auto'>
                    <h2 className='text-2xl text-white text-center'>Movies Dashboard</h2>
                    <table className='w-full text-center text-white border-2 border-gray-400 border-collapse overflow-auto'>
                        <tr className='border-2 border-gray-400'>
                            <th>S No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Poster</th>
                            <th>Operations</th>
                        </tr>
                        {movies?.map((movie, index) => {
                            return (
                                <tr className='border-2 border-gray-400'>
                                    <td>{index + 1}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.description}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.poster}</td>
                                    <td>{movie.imdbRating}</td>
                                    <td>
                                        <button className='p-2 m-2 bg-blue-400 rounded-lg' onClick={() => onEdit(movie)}>Edit</button>
                                        <button className='p-2 m-2 bg-red-400 rounded-lg'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                :
                <h2 className='text-2xl text-white text-center'>{errorMessage}</h2>
            }
        </div>
    )
}

export default Dashboard