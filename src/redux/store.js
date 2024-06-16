import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
    reducer: {
        movie: movieReducer,
        user: userReducer,
        filter: filterReducer
    },
});

export default store;
