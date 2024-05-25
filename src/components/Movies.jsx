//@ts-check
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        callMoviesApi()
    }, []);

    const callMoviesApi = async () => {
        try {
            const response = await axios.get("/api/movies");
            setMovies(response.data.movies || []);
        } catch (error) {
            console.log({ error })
        }
    }

    const limitMovieTitle = (title) => {
        if(title.length > 10) {
            let newTitle = "";
            for(let i = 0; i < 11; i++) {
                newTitle += title[i];
            }
            newTitle += "...";
            return newTitle;
        }
        return title;
    }

    return (
        <div className='h-[calc(100%-64px)] py-4 border-2 border-black flex flex-wrap justify-center'>
            {movies.map((movie) =>
                <MovieCard
                    imgSrc={movie.poster}
                    title={limitMovieTitle(movie.title)}
                    genre={movie.genre}
                    imdbRating={movie.imdbRating}
                />
            )}
        </div>
    )
}

export default Movies