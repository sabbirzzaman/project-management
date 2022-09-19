import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddTeamsMutation } from '../../features/teams/teamsApi';

const TeamCardModal = ({ setIsOpen }) => {
    // local state
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('red');

    // user
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};

    const [addTeams, { isSuccess, isLoading }] = useAddTeamsMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTeams({
            name,
            title,
            color,
            email,
            date: Date.now(),
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess, setIsOpen]);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-slate-900 h-full bg-opacity-60 z-10">
            <div
                onClick={() => setIsOpen(false)}
                className="absolute w-full h-full bg-slate-900 bg-opacity-60"
            ></div>
            <div className="bg-white w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
                    Add new team!
                </h3>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="flex">
                            <input
                                id="team-name"
                                name="team"
                                type="text"
                                autoComplete="team-name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Team name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <select
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                onChange={(e) => setColor(e.target.value)}
                            >
                                <option value="red" defaultValue>
                                    Red
                                </option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="violet">Violet</option>
                                <option value="pink">Pink</option>
                                <option value="orange">Orange</option>
                                <option value="teal">Teal</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="team-title" className="sr-only">
                                Team title
                            </label>
                            <input
                                id="team-title"
                                name="title"
                                type="text"
                                autoComplete="team-title"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Team title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300"
                            disabled={isLoading}
                        >
                            Add team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamCardModal;
