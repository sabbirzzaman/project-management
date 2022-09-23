import React, { useEffect, useState } from 'react';
import moment from 'moment';
import manageColor from '../../utils/manageColor';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteProjectMutation } from '../../features/projects/projectsApi';
import toast from 'react-hot-toast';

const ProjectCard = ({ project, type, index, options }) => {
    const { id, avatar, date, color, team, title } = project || {};
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

    const [, dragRef] = useDrag({
        type: type,
        item: () => ({ ...project, index }),
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });

    const teamColor = manageColor(color);

    const handleDelete = () => {
        deleteProject(id);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Project deleted successfully!')
        }
    }, [isSuccess])

    return (
        <>
            <div
                className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                ref={dragRef}
            >
                {options && (
                    <div className="absolute top-0 right-0 hidden items-center mt-3 mr-2 group-hover:flex">
                        <button
                            className={`text-base transition delay-100 translate-x-[100px] text-gray-700 px-2 py-1 rounded hover:bg-red-100 hover:text-red-600 ${
                                isOptionsOpen && 'translate-x-[0px]'
                            }`}
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon className="" icon={faTrash} />
                        </button>
                        <button
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                            className="text-base text-gray-500 px-2 py-1 ml-1 rounded hover:bg-gray-200 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </div>
                )}
                <span
                    className={`flex items-center h-6 px-3 text-xs font-semibold ${teamColor} rounded-full`}
                >
                    {team.toUpperCase()}
                </span>
                <h4 className="mt-3 text-sm font-medium">{title}</h4>
                <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                    <div className="flex items-center">
                        <svg
                            className="w-4 h-4 text-gray-300 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 leading-none">
                            {moment(date).format('MMM DD')}
                        </span>
                    </div>

                    <img
                        className="w-6 h-6 ml-auto rounded-full"
                        src={avatar}
                        alt="user"
                    />
                </div>
            </div>
        </>
    );
};

export default ProjectCard;
