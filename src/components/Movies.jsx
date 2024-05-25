//@ts-check
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies, clearMovies } from '../redux/slices/movieSlice';

const Movies = () => {
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();
    
    useEffect(() => {
        callMoviesApi()
    }, []);

    const callMoviesApi = async () => {
        try {
            const response = await axios.get("/api/movies");
            dispatch(clearMovies());
            dispatch(addMovies(response.data.movies || []));
        } catch (error) {
            console.log({ error })
        }
    }

    return (
        <div className='h-[calc(100%-64px)] py-4 border-2 border-black flex flex-wrap justify-center'>
            {movies.length > 0 ? movies.map((movie) =>
                <MovieCard
                    key={movie._id}
                    imgSrc={movie.poster}
                    genre={movie.genre}
                    imdbRating={movie.imdbRating}
                />
            ) : <h3>Nothing to show...</h3>}
        </div>
    )
}

export default Movies