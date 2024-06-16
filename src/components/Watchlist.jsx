//@ts-check
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlistMovies, clearWatchlistMovies } from '../redux/slices/movieSlice';
import MovieCard from './MovieCard';
import { toast } from 'react-hot-toast';

const Watchlist = () => {
    const [loading, setLoading] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const currentUser = useSelector(state => state.user.user);
    const watchlistMovies = useSelector(state => state.movie.watchlistMovies);
    const searchText = useSelector((state) => state.filter.searchText);

    const dispatch = useDispatch();

    useEffect(() => {
        callWatchlistApi();
    }, [currentUser]);

    useEffect(() => {
        const movies = watchlistMovies.filter((m) => m.title.toLowerCase().includes(searchText));
        setFilteredMovies(movies);
    }, [searchText, watchlistMovies]);

    const callWatchlistApi = useCallback(async() => {
        try {
            setLoading(true);
            if(!currentUser && JSON.parse(currentUser) === "{}") {
                toast.error("Something went wrong");
                return;
            }
            const apiUrl = `/api/watchlist?id=${currentUser?.id}`;
            const response = await axios.get(apiUrl);
            if(response.status === 200) {
                dispatch(clearWatchlistMovies());
                dispatch(addWatchlistMovies(response.data.watchlist.movies || []));
                setFilteredMovies(response.data.watchlist.movies || []);
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [currentUser, clearWatchlistMovies, addWatchlistMovies, filteredMovies, loading]);


    return (
        <div>
            {currentUser ?
                <>
                    <h2 className='text-white text-3xl m-4'>My Watchlist</h2>
                    {loading ? 
                        <h2 className='text-2xl text-white text-center'>Loading...</h2>
                        :
                        <div className='flex flex-wrap m-4'>
                            {filteredMovies.length > 0 ?
                                filteredMovies.map(movie => {
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