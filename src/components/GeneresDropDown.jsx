//@ts-check
import React from 'react'

const GeneresDropDown = () => {
    return (
        <select className='bg-black text-white w-24 h-10 mx-2 border-2 border-gray-100'>
            <option  selected value="action">Genres</option>
            <option value="action">Action</option>
            <option value="horror">Horror</option>
        </select>
    )
}

export default GeneresDropDown