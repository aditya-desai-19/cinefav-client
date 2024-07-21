import React from 'react';
import { X } from 'react-feather';

const Modal = ({modalBody, onCancel}) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end max-md:items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform h-modal-height overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className='float-right m-4'>
                            <button type="button" onClick={onCancel}><X fontSize={5} color='black' /></button>
                        </div>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-full w-full">
                            <div className='flex justify-center h-full'>
                                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    {modalBody}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal