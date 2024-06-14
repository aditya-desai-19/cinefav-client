import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    watchlistMovies: []
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addMovies: (state, action) => {
            state.movies = action.payload
        },
        addWatchlistMovies: (state, action) => {
            state.watchlistMovies = action.payload
        },
        clearMovies: (state) => {
            state.movies = []
        },
        clearWatchlistMovies: (state) => {
            state.watchlistMovies = []
        }
    },
});

export const { addMovies, clearMovies, addWatchlistMovies, clearWatchlistMovies } = movieSlice.actions;

export default movieSlice.reducer;
