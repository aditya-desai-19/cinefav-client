import React, { useCallback, useState } from 'react';
import { PlusCircle, Star } from 'react-feather'

const MovieCard = ({ imgSrc, genre, imdbRating }) => {
    const [isHover, setIsHover] = useState(false);

    const handleHover = useCallback((value) => {
        setIsHover(value);
    },[isHover]);
    
    return (
        <div className="h-48 w-52 mx-2 my-1 border-2 border-gray-200 hover:h-72 hover:w-80 hover:scale-110" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            <div className={`${isHover ? 'h-48' : 'h-full'}`}>
                <img src={imgSrc} alt='movie-poster' className='w-full h-full' />
            </div>
            {isHover &&
                <div className='text-gray-100 p-2'>
                    <div className='flex text-gray-100 w-full'>
                        <button className='m-2'><PlusCircle size={30} /></button>
                        <h3 className='m-2 flex'><Star size={25} color='yellow'/><span className='mx-2 text-xl'>{imdbRating}</span></h3>
                    </div>
                    <p className='m-2'>{"Action"}</p>
                </div>}
        </div>
    )
}

export default MovieCard