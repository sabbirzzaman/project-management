import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';
import logo from '../../images/logo.png';

const Navigation = () => {
    const projects = useMatch('/projects');
    const teams = useMatch('/teams');

    const { user } = useSelector((state) => state.auth) || {};
    const { name, avatar } = user || {};
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };

    return (
        <div className="flex items-center justify-between py-3 px-10 bg-white bg-opacity-75">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-10 w-10" />

                <div className="ml-10">
                    <Link
                        className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
                            teams ? 'text-indigo-700' : 'text-gray-600'
                        }`}
                        to="/teams"
                    >
                        Teams
                    </Link>
                    <Link
                        className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
                            projects ? 'text-indigo-700' : 'text-gray-600'
                        }`}
                        to="/projects"
                    >
                        Projects
                    </Link>
                </div>

                {projects && (
                    <input
                        className={`flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring`}
                        type="search"
                        placeholder="Search for anything…"
                    />
                )}
            </div>

            <div className="dropdown dropdown-end">
                <label
                    tabIndex="0"
                    className="btn btn-ghost rounded-lg px-3 w-full gap-3 btn-circle avatar hover:bg-gray-200"
                >
                    <span className="font-semibold text-gray-600 normal-case">{name}</span>
                    <div className="w-8 rounded-full">
                        <img src={avatar} alt={name} />
                    </div>
                </label>
                <ul
                    tabIndex="0"
                    className="mt-3 p-2 shadow menu bg-white bg-opacity-60 menu-compact dropdown-content rounded-lg w-52"
                >
                    <li>
                        <span
                            onClick={handleLogout}
                            className="cursor-pointer text-gray-600 bg-white bg-opacity-60 hover:bg-white px-5 font-semibold py-2 rounded-lg transition-all delay-75"
                        >
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
