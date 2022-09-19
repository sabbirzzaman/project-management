import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navigation = () => {
    const projects = useMatch('/projects');
    const teams = useMatch('/teams');

    const {user} = useSelector(state => state.auth) || {};

    return (
        <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
            <img src={logo} alt="logo" className="h-10 w-10" />

            {projects && (
                <input
                    className={`flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring`}
                    type="search"
                    placeholder="Search for anything…"
                />
            )}

            <div className="ml-10">
                <Link
                    className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
                        projects ? 'text-indigo-700' : 'text-gray-600'
                    }`}
                    to="/projects"
                >
                    Projects
                </Link>
                <Link
                    className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
                        teams ? 'text-indigo-700' : 'text-gray-600'
                    }`}
                    to="/teams"
                >
                    Team
                </Link>
            </div>
            <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
                <img
                    src={user?.avatar}
                    alt="User avatar"
                />
            </button>
        </div>
    );
};

export default Navigation;
