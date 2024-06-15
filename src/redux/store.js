import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import userReducer from './slices/userSlice';
import genreReducer from './slices/genreSlice';

const store = configureStore({
    reducer: {
        movie: movieReducer,
        user: userReducer,
        genre: genreReducer
    },
});

export default store;
