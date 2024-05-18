//@ts-check
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwidXNlck5hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VyTmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJjcmVhdGVkQXQiOnRydWUsInVwZGF0ZWRBdCI6dHJ1ZSwiX192Ijp0cnVlfX19LCJza2lwSWQiOnRydWV9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjY2MmQwZWNmM2UzYzEwZGM1YmM0NjIyMiIsInVzZXJOYW1lIjoiYWRpdHlhMTAiLCJlbWFpbCI6ImFkaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRocER0YWk4V1hTaGNrcW9RTDBIVHpPTHJ1aWMvc2VaQUJlaW5yelV2MmVobHRwY1lnSC8uaSIsImNyZWF0ZWRBdCI6IjIwMjQtMDQtMjdUMTQ6NDI6MjMuNjMyWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMjdUMTQ6NDI6MjMuNjMyWiIsIl9fdiI6MH0sImV4cCI6MTcxNjEwMjgwNSwiaWF0IjoxNzE2MDE2NDA1fQ.Y9JM9_ud-ziaf1WsaQSfFJ4D4vjTIClJuzKXEmzuvYs"

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        callMoviesApi()
    }, []);

    const callMoviesApi = async () => {
        try {
            const response = await axios.get("/api/movies", { headers: { 'Authorization': `Bearer ${token}` } });
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
        <div className='bg-gray-300 py-14 px-2 border-2 border-black m-4 flex flex-wrap'>
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