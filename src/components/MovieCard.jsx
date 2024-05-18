import React from 'react'

const MovieCard = ({ imgSrc, title, genre, imdbRating }) => {
    return (
        <div className='h-56 w-56 m-2 border-2 border-black'>
            <div className='h-44'>
                <img src={imgSrc} alt='movie-poster' className='h-full w-full' />
            </div>
            <div className='flex justify-between'>
                <h3 className='max-w-20 max-h-10 text-pretty text-center'>{title}</h3>
                <button>+</button>
                <h3>{imdbRating}</h3>
            </div>
            <p>{genre}</p>
        </div>
    )
}

export default MovieCard