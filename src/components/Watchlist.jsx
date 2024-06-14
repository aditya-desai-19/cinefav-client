//@ts-check
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlistMovies, clearWatchlistMovies } from '../redux/slices/movieSlice';
import MovieCard from './MovieCard';

const Watchlist = () => {
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector(state => state.user.user);
    const watchlistMovies = useSelector(state => state.movie.watchlistMovies);

    const dispatch = useDispatch();

    const callWatchlistApi = useCallback(async() => {
        try {
            setLoading(true);
            const apiUrl = `/api/watchlist?id=${currentUser?.id}`;
            console.log(apiUrl);
            const response = await axios.get(apiUrl);
            if(response.status === 200) {
                console.log({response})
                dispatch(clearWatchlistMovies());
                dispatch(addWatchlistMovies(response.data.watchlist.movies || []));
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        callWatchlistApi();
    }, []);

    return (
        <div>
            {currentUser ?
                <>
                    <h2 className='text-white text-3xl m-4'>My Watchlist</h2>
                    {loading ? 
                        <h2 className='text-2xl text-white text-center'>Loading...</h2>
                        :
                        <div className='flex flex-wrap m-4'>
                            {watchlistMovies.length > 0 ?
                                watchlistMovies.map(movie => {
                                    return (
                                        <MovieCard
                                            key={movie._id}
                                            imgSrc={movie.poster}
                                            genre={movie.genre}
                                            imdbRating={movie.imdbRating}
                                            // addMovieToWatchlist={() => addMovieToWatchlist(movie)}
                                        />
                                    )
                                })
                                :
                                <h2 className='text-2xl text-white'>Nothing to show...</h2>
                            }
                        </div>
                    }
                </>
                :
                <h2 className='text-white text-5xl text-center'>Login to view the watchlist</h2>
            }
        </div>
    )
}

export default Watchlist