import React from 'react';

const DeleteModal = ({ message, setDeleteModal, deleteHandler, isNotUser }) => {
    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-violet-500 h-full bg-opacity-60 z-10">
            <div className="absolute w-full h-full bg-slate-900 bg-opacity-60"></div>
            <div className="relative bg-[#F9FAFB] w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                {!isNotUser ? (
                    <>
                        <p className="text-base sm:text-lg md:text-lg font-semibold mb-5">
                            {message}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={deleteHandler}
                                className="bg-violet-300 text-violet-800 font-semibold transition-all ease-in-out hover:bg-violet-600 hover:text-violet-100  px-6 py-1 rounded-lg"
                            >
                                Sure!
                            </button>
                            <button
                                className="bg-red-300 text-red-800 font-semibold transition-all ease-in-out hover:bg-red-600 hover:text-red-100 px-6 py-1 rounded-lg"
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='text-center'>
                        <p className="text-base sm:text-lg md:text-lg font-semibold mb-5">
                            Only creator can delete a project!
                        </p>
                        <button
                            className="bg-red-300 text-red-800 font-semibold transition-all ease-in-out hover:bg-red-600 hover:text-red-100 px-6 py-1 rounded-lg"
                            onClick={() => setDeleteModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteModal;
