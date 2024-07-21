//@ts-check
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies, clearMovies, removeWatchlistMovieById } from '../redux/slices/movieSlice';
import { clearWatchlistMovies, addWatchlistMovies } from '../redux/slices/movieSlice';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/api';
import WarningPopup from './WarningPopup';
import { callMovieApi, callWatchlistApi } from '../utils/movieApi';

const Movies = () => {
    const [filteredMovies, setFilteredMovies] = useState([]);

    const currentUser = useSelector((state) => state.user.user);
    const movies = useSelector((state) => state.movie.movies);
    const watchlistedMovies = useSelector((state) => state.movie.watchlistMovies);
    const genre = useSelector((state) => state.filter.genre);
    const searchText = useSelector((state) => state.filter.searchText);

    const dispatch = useDispatch();

    useEffect(() => {
        getMovies()
    }, []);

    useEffect(() => {
        getWatchlist();
    }, []);

    useEffect(() => {
        if (genre === "default") {
            setFilteredMovies(movies);
        } else {
            //converting each movie genre to lowercase string then converting it to array and then for each substring removing
            //empty spaces and then checking whether the selected genre is present or not
            const filteredMoviesByGenre = movies.filter(m => m.genre.toLowerCase().split(",").map(x => x.trim()).includes(genre));
            setFilteredMovies(filteredMoviesByGenre);
        }
    }, [genre]);

    useEffect(() => {
        const filteredMoviesBySearchText = movies.filter(m => m.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredMovies(filteredMoviesBySearchText);
    }, [searchText]);

    const getWatchlist = useCallback(async () => {
        try {
            const movies = await callWatchlistApi(currentUser?.id);
            dispatch(clearWatchlistMovies());
            dispatch(addWatchlistMovies(movies));
        } catch (error) {
            console.log(error);
        }
    }, [clearWatchlistMovies, addWatchlistMovies, callWatchlistApi]);

    const getMovies = useCallback(async () => {
        try {
            const movies = await callMovieApi();
            dispatch(clearMovies());
            dispatch(addMovies(movies));
            setFilteredMovies(movies);
        } catch (error) {
            console.log({ error })
        }
    }, [clearMovies, addMovies, filteredMovies, callMovieApi]);

    const addMovieToWatchlist = useCallback(async (movie) => {
        try {
            if (currentUser?.id === null) {
                toast.error("Current user does not exist", { duration: 3000, position: "top-right" });
                return;
            }
            const body = {
                id: currentUser?.id,
                movie: movie
            };
            const response = await axiosInstance.post("/api/watchlist", body);
            if (response.status === 201) {
                toast.success("Successfully added movie to watchlist", { duration: 3000, position: "top-right" });
            }
        } catch (error) {
            console.log(error)
        }
    }, [currentUser]);

    const removeMovieFromWatchlist = useCallback(async (movie) => {
        try {
            if (currentUser?.id === null) {
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
                        removeMovieFromWatchlist(movie);
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

    const watchlistedMovieIds = useMemo(() => {
        return watchlistedMovies.map(movie => movie._id);
    }, [watchlistedMovies]);

    return (
        <>
            {(currentUser?.id.length && (currentUser?.role === "NORMAL" || currentUser?.role === "ADMIN")) ?
                <div className='h-full py-4 border-2 border-black flex flex-wrap overflow-y-auto justify-evenly max-md:justify-between max-sm:justify-center'>
                    {filteredMovies.length > 0 ? filteredMovies.map((movie) =>
                        <MovieCard
                            key={movie._id}
                            imgSrc={movie.poster}
                            genre={movie.genre}
                            imdbRating={movie.imdbRating}
                            isAdmin={currentUser?.role === "ADMIN"}
                            isWatchlisted={watchlistedMovieIds.includes(movie._id)}
                            addMovieToWatchlist={() => addMovieToWatchlist(movie)}
                            removeFromWatchlist={() => showWarningToast(movie)}
                        />
                    ) : <h2 className='text-2xl text-white'>Nothing to show...</h2>}
                </div>
                :
                <h2 className='text-2xl text-white text-center'>{"Unauthorized"}</h2>
            }
        </>
    )
}

export default Movies