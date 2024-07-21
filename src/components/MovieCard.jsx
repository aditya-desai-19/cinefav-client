//@ts-check
import React, { useCallback, useState } from 'react';
import { Star, Heart } from 'react-feather'

const MovieCard = ({ 
    imgSrc,
    genre, 
    imdbRating, 
    isAdmin,
    isWatchlisted, 
    addMovieToWatchlist, 
    removeFromWatchlist
}) => {
    const [isHover, setIsHover] = useState(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(isWatchlisted);

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

    const handleWatchlist = useCallback((value) => {
        if(value) {
            setIsMovieWatchlisted(true);
            addMovieToWatchlist();
        } else {
            setIsMovieWatchlisted(false);
            removeFromWatchlist();
        }
    },[isMovieWatchlisted, addMovieToWatchlist, removeFromWatchlist]);
    
    return (
        <div className={`h-48 w-52 mx-2 my-1 border-2 border-gray-200 cursor-pointer ${isHover && 'hover:h-72 hover:w-80 hover:scale-110'}`} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
            <div className={`${isHover ? 'h-48' : 'h-full'}`}>
                <img src={imgSrc} alt='movie-poster' className='w-full h-full' />
            </div>
            {isHover &&
                <div className='text-gray-100 p-2'>
                    <div className='flex text-gray-100 w-full'>
                        {!isAdmin && <>
                            {isMovieWatchlisted ? 
                                <span title='Watchlisted' className='m-2 cursor-pointer' onClick={() => handleWatchlist(false)}><Heart size={30} color='red' fill='red'/></span> 
                                :
                                <span title='Add to watchlist' className='m-2 cursor-pointer' onClick={() => handleWatchlist(true)}><Heart size={30} color='white'/></span>
                            }
                        </>}
                        <h3 className='m-2 flex'><Star size={25} color='yellow' /><span className='mx-2 text-xl'>{imdbRating}</span></h3>
                    </div>
                    <p className='m-2'>{genre}</p>
                </div>}
        </div>
    )
}

export default MovieCard