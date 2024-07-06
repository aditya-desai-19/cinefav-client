import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genre: "default",
    searchText: ""
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeGenre: (state, action) => {
            state.genre = action.payload
        },
        changeFilterText: (state, action) => {
            state.searchText = action.payload
        },
    },
});

export const { changeGenre, changeFilterText } = filterSlice.actions;

export default filterSlice.reducer;
