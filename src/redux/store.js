import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        movie: movieReducer,
        user: userReducer
    },
});

export default store;
