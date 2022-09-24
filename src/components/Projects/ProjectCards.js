import React from 'react';

const ProjectCards = ({ children, reference, isOver }) => {
    return (
        <div
            className={`flex flex-col pb-2 overflow-x-hidden bg-white bg-opacity-30 backdrop-blur-sm px-2 rounded-lg min-h-[450px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thumb-rounded-full ${isOver && 'bg-opacity-70'}`}
            ref={reference}
        >
            {children}
        </div>
    );
};

export default ProjectCards;
