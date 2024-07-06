//@ts-check
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlistMovies, clearWatchlistMovies, removeWatchlistMovieById } from '../redux/slices/movieSlice';
import MovieCard from './MovieCard';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/api';
import WarningPopup from './WarningPopup';
import { callWatchlistApi } from '../utils/movieApi';

const Watchlist = () => {
    const [loading, setLoading] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const currentUser = useSelector(state => state.user.user);
    const watchlistMovies = useSelector(state => state.movie.watchlistMovies);
    const searchText = useSelector((state) => state.filter.searchText);

    const dispatch = useDispatch();

    useEffect(() => {
        getWatchlist();
    }, [currentUser]);

    useEffect(() => {
        const movies = watchlistMovies.filter((m) => m.title.toLowerCase().includes(searchText));
        setFilteredMovies(movies);
    }, [searchText, watchlistMovies]);

    const getWatchlist = useCallback(async() => {
        try {
            setLoading(true);
            const movies = await callWatchlistApi(currentUser?.id);
            dispatch(clearWatchlistMovies());
            dispatch(addWatchlistMovies(movies));
            setFilteredMovies(movies);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [currentUser, clearWatchlistMovies, addWatchlistMovies, filteredMovies, loading, callWatchlistApi]);

    const removeMovieFromWatchlist = useCallback(async (movie) => {
        try {
            if (JSON.stringify(currentUser) === "{}" || currentUser === null) {
                toast.error("Current user does not exist", { duration: 3000, position: "top-right" });
                return;
            }
            const body = {
                movieId: movie._id,
                id: currentUser?.id
            };
            const response = await axiosInstance.put("/api/watchlist", body);
            if (response.status === 200) {
                toast.success("Successfully removed movie from watchlist", { duration: 3000, position: "top-right" });
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentUser]);

    const showWarningToast = useCallback((movie) => {
        toast.custom(
            (t) => (
                <WarningPopup
                    message={"Are you sure you want to remove movie from watchlist?"}
                    onSuccess={() => {
                        removeMovieFromWatchlist(movie)
                        dispatch(removeWatchlistMovieById(movie._id || ""));
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
    }, [removeMovieFromWatchlist]);


    return (
        <div className='h-full w-full overflow-y-auto'>
            {currentUser ?
                <div className='flex flex-col h-full w-full'>
                    <h2 className='text-white text-3xl my-2 mx-4 max-sm:text-center'>My Watchlist</h2>
                    {loading ? 
                        <h2 className='text-2xl text-white text-center'>Loading...</h2>
                        :
                        <div className='h-full flex flex-wrap m-4 max-md:justify-between max-sm:justify-center'>
                            {filteredMovies.length > 0 ?
                                filteredMovies.map(movie => {
                                    return (
                                        <MovieCard
                                            key={movie._id}
                                            imgSrc={movie.poster}
                                            genre={movie.genre}
                                            imdbRating={movie.imdbRating}
                                            isWatchlisted={true}
                                            removeFromWatchlist={() => showWarningToast(movie)}
                                        />
                                    )
                                })
                                :
                                <h2 className='text-2xl text-white'>Nothing to show...</h2>
                            }
                        </div>
                    }
                </div>
                :
                <h2 className='text-white text-5xl text-center'>Login to view the watchlist</h2>
            }
        </div>
    )
}

export default Watchlist