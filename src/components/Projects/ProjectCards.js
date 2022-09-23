import React from 'react';

const ProjectCards = ({ children, reference, isOver }) => {
    return (
        <div
            className={`flex flex-col pb-2 overflow-auto bg-white bg-opacity-30 backdrop-blur-sm px-2 rounded-lg min-h-[456px] ${isOver && 'bg-opacity-70'}`}
            ref={reference}
        >
            {children}
        </div>
    );
};

export default ProjectCards;
