//@ts-check
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies, clearMovies, removeWatchlistMovieById } from '../redux/slices/movieSlice';
import { clearWatchlistMovies, addWatchlistMovies } from '../redux/slices/movieSlice';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/api';
import WarningPopup from './WarningPopup';

const Movies = ({currentUser = {}}) => {
    const [filteredMovies, setFilteredMovies] = useState([]);

    const movies = useSelector((state) => state.movie.movies);
    const watchlistedMovies = useSelector((state) => state.movie.watchlistMovies);
    const genre = useSelector((state) => state.filter.genre);
    const searchText = useSelector((state) => state.filter.searchText);

    const dispatch = useDispatch();

    useEffect(() => {
        callMoviesApi()
    }, []);

    useEffect(() => {
        callWatchlistApi();
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

    const callWatchlistApi = useCallback(async () => {
        try {
            const apiUrl = `/api/watchlist?id=${currentUser?.id}`;
            const response = await axios.get(apiUrl);
            if (response.status === 200) {
                dispatch(clearWatchlistMovies());
                dispatch(addWatchlistMovies(response.data.watchlist.movies || []));
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const callMoviesApi = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/api/movies");
            dispatch(clearMovies());
            dispatch(addMovies(response.data.movies || []));
            setFilteredMovies(response.data.movies || []);
        } catch (error) {
            console.log({ error })
        }
    }, [clearMovies, addMovies, filteredMovies]);

    const addMovieToWatchlist = useCallback(async (movie) => {
        try {
            if (JSON.stringify(currentUser) === "{}" || currentUser === null) {
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
        const movieIds = [];
        for(let i = 0; i < watchlistedMovies.length; i++) {
            movieIds.push(watchlistedMovies[i]?._id);
        }
        return movieIds;
    }, [watchlistedMovies]);

    return (
        <>
            {(JSON.stringify(currentUser) !== "{}" || currentUser) ?
                <div className='h-full py-4 border-2 border-black flex flex-wrap overflow-y-auto justify-evenly max-md:justify-between max-sm:justify-center'>
                    {filteredMovies.length > 0 ? filteredMovies.map((movie) =>
                        <MovieCard
                            key={movie._id}
                            imgSrc={movie.poster}
                            genre={movie.genre}
                            imdbRating={movie.imdbRating}
                            isWatchlisted={watchlistedMovieIds.includes(movie._id)}
                            addMovieToWatchlist={() => addMovieToWatchlist(movie)}
                            removeFromWatchlist={() => showWarningToast(movie)}
                        />
                    ) : <h2 className='text-2xl text-white'>Nothing to show...</h2>}
                </div>
                :
                <h2 className='text-2xl text-white'>Login first...</h2>
            }
        </>
    )
}

export default Movies