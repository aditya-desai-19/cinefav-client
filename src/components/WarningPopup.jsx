//@ts-check
import React from 'react';

const WarningPopup = ({ message, onSuccess, onDismiss, cancelButtonName = "Yes", dismissButtonName = "No" }) => {
    return (
        <div className='bg-white p-4 rounded-lg flex flex-col justify-center'>
            {message}
            <div className='flex justify-center'>
                <button 
                    className="bg-red-500 rounded-lg p-2 m-2 w-12 text-white" 
                    onClick={onSuccess}
                >
                    {cancelButtonName}
                </button>
                <button 
                    className='rounded-lg p-2 border-black border-2 m-2'
                    onClick={onDismiss} 
                >
                    {dismissButtonName}
                </button>
            </div>
        </div>
    )
}

export default WarningPopup