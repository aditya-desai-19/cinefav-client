import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genre: "default"
}

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        changeGenre: (state, action) => {
            state.genre = action.payload
        }
    },
});

export const { changeGenre } = genreSlice.actions;

export default genreSlice.reducer;
