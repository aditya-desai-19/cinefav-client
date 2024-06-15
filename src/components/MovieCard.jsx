//@ts-check
import React, { useCallback, useState } from 'react';
import { PlusCircle, Star } from 'react-feather'

const MovieCard = ({ imgSrc, genre, imdbRating, addMovieToWatchlist }) => {
    const [isHover, setIsHover] = useState(false);
    let hoverTimeout;

    const handleHoverEnter = useCallback(() => {
        hoverTimeout = setTimeout(() => {
                        setIsHover(true);
                        }, 3000);
    }, [isHover]);

    const handleHoverLeave = useCallback(() => {
        clearTimeout(hoverTimeout);
        setIsHover(false);
    },[isHover]);
    
    return (
        <div className={`h-48 w-52 mx-2 my-1 border-2 border-gray-200 cursor-pointer ${isHover && 'hover:h-72 hover:w-80 hover:scale-110'}`} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
            <div className={`${isHover ? 'h-48' : 'h-full'}`}>
                <img src={imgSrc} alt='movie-poster' className='w-full h-full' />
            </div>
            {isHover &&
                <div className='text-gray-100 p-2'>
                    <div className='flex text-gray-100 w-full'>
                        <button className='m-2' title='Add to watchlist' onClick={addMovieToWatchlist}><PlusCircle size={30} /></button>
                        <h3 className='m-2 flex'><Star size={25} color='yellow'/><span className='mx-2 text-xl'>{imdbRating}</span></h3>
                    </div>
                    <p className='m-2'>{genre}</p>
                </div>}
        </div>
    )
}

export default MovieCard