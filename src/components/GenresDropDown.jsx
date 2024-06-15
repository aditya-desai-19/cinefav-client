//@ts-check
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeGenre } from '../redux/slices/genreSlice';

const GenresDropDown = () => {
    const dispatch = useDispatch();

    const handleOnChange = useCallback((e) => {
        dispatch(changeGenre(e.target.value));
    }, [changeGenre]);

    return (
        <select className='bg-black text-white w-24 h-8 mx-2 my-1 border-2 border-gray-100' onChange={handleOnChange}>
            <option  selected value="default">Genres</option>
            <option value="action">Action</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
            <option value="science-fiction">Sci-fi</option>
        </select>
    )
}

export default GenresDropDown