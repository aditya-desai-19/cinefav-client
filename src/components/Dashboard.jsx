//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { callMovieApi } from '../utils/movieApi';
import { addMovies, clearMovies } from '../redux/slices/movieSlice';
import WarningPopup from './WarningPopup';
import axiosInstance from '../utils/api';
import MovieAddEditForm from './MovieAddEditForm';
import Modal from './Modal';

const Dashboard = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showMovieRegisterModal, setShowMovieRegisterModal] = useState(false);
    const [showMovieEditModal, setShowMovieEditModal] = useState(false);
    const [isMoviesFetching, setIsMoviesFetching] = useState(false);
    const [movie, setMovie] = useState({});

    const currentUser = useSelector((state) => state.user.user);
    const movies = useSelector((state) => state.movie.movies);

    const dispatch = useDispatch();

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        if (!currentUser) {
            const message = "Please login...";
            toast.error(message);
            setErrorMessage(message);
        } else {
            if (currentUser?.role !== "ADMIN") {
                const message = "Unauthorized! You don't have permission to access this page";
                toast.error(message);
                setErrorMessage(message);
            }
        }
    }, [currentUser]);

    const getMovies = useCallback(async () => {
        try {
            setIsMoviesFetching(true)
            const movies = await callMovieApi();
            dispatch(clearMovies());
            dispatch(addMovies(movies));
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsMoviesFetching(false);
        }
    }, [callMovieApi, clearMovies, addMovies, isMoviesFetching]);

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

    const setShowMovieRegisterModalOnClick = useCallback((value) => {
        setShowMovieRegisterModal(value);
    }, [showMovieRegisterModal]);

    const onEditClick = useCallback((movie) => {
        setMovie(movie);
        setShowMovieEditModal(true);
    }, [movie, showMovieEditModal])

    const setShowMovieEditModalOnClick = useCallback((value) => {
        setShowMovieEditModal(value);
    }, [showMovieEditModal]);

    const callDeleteApi = useCallback(async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/movies/${id}`);
            if (response.status === 200) {
                toast.success("Successfully deleted the movie");
                getMovies();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }, [getMovies]);

    const callMovieRegisterApi = useCallback(async (values) => {
        try {
            const { file, description, imdbRating, genre } = values;
            if(Number.isNaN(imdbRating)) {
                toast.error("Invalid imdb rating");
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title",description);
            formData.append("description",description);
            formData.append("imdbRating",imdbRating);
            formData.append("genre",genre);
            const response = await axiosInstance.post("/api/movies", formData, 
            { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                toast.success("Successfully added a movie");
                getMovies();
                setShowMovieRegisterModalOnClick(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }, [getMovies, setShowMovieRegisterModalOnClick]);

    const callMovieUpdateApi = useCallback(async (values) => {
        try {
            const { _id, file, description, imdbRating, genre } = values;
            if(Number.isNaN(imdbRating)) {
                toast.error("Invalid imdb rating");
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title",description);
            formData.append("description",description);
            formData.append("imdbRating",imdbRating);
            formData.append("genre",genre);
            const response = await axiosInstance.put(`api/movies/${_id}`, formData, 
            { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success("Successfully added a movie");
                getMovies();
                setShowMovieEditModalOnClick(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }, [getMovies, setShowMovieEditModalOnClick]);

    return (
        <div className='h-full w-full'>
            {currentUser?.role === "ADMIN"
                ?
                <>  
                    {showMovieRegisterModal && <Modal modalBody={<MovieAddEditForm onSubmit={callMovieRegisterApi}/>} onCancel={() => setShowMovieRegisterModalOnClick(false)}/>}
                    {showMovieEditModal && <Modal modalBody={<MovieAddEditForm initialValues={movie} onSubmit={callMovieUpdateApi}/>} onCancel={() => setShowMovieEditModalOnClick(false)}/>}
                    <div className='flex justify-between m-2'>
                        <h2 className='text-2xl text-white text-center'>Movies Dashboard</h2>
                        <button className='bg-blue-400 w-20 p-2 text-white rounded-lg' onClick={() => setShowMovieRegisterModalOnClick(true)}>
                            Add
                        </button>
                    </div>
                    {isMoviesFetching ? 
                        <div className='flex justify-center'>
                            <img src='../../public/spinner.gif' className='h-12' />
                        </div>
                        : 
                        <div className='overflow-auto h-80p max-md:h-90p '>
                            <table className='table-auto w-full text-center text-white border-2 border-gray-400 border-collapse'>
                                <thead className='bg-gray-800'>
                                    <tr className='border-2 border-gray-400 '>
                                        <th>S No</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Genre</th>
                                        <th>Poster</th>
                                        <th>Rating</th>
                                        <th>Operations</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-700'>
                                    {movies?.map((movie, index) => {
                                        return (
                                            <tr className='border-2 border-gray-400 h-20 max-md:h-16 max-sm:h-12'>
                                                <td className='p-2'>{index + 1}</td>
                                                <td className='p-2'>{movie.title}</td>
                                                <td className='p-2'>{movie.description}</td>
                                                <td className='p-2'>{movie.genre}</td>
                                                <td className='p-2'>
                                                    <img src={`${movie.poster}`} alt='poster' className='object-fill w-full h-20 max-md:h-16 max-sm:h-12' />
                                                </td>
                                                <td className='p-2'>{movie.imdbRating}</td>
                                                <td className='p-2'>
                                                    <button className='p-2 m-2 bg-blue-400 rounded-lg' onClick={() => onEditClick(movie)}>Edit</button>
                                                    <button className='p-2 m-2 bg-red-400 rounded-lg' onClick={() => onDelete(movie._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </>
                :
                <h2 className='text-2xl text-white text-center'>{errorMessage}</h2>
            }
        </div>
    )
}

export default Dashboard