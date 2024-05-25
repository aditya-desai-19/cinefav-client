import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: []
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addMovies: (state, action) => {
            state.movies = action.payload
        },
        clearMovies: (state) => {
            state.movies = []
        }
    },
});

export const { addMovies, clearMovies } = movieSlice.actions;

export default movieSlice.reducer;
