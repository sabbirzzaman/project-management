import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { userLoggedOut } from '../../features/auth/authSlice';
import { getSearchKeyword } from '../../features/search/searchSlice';
import logo from '../../images/logo.png';

const Navigation = () => {
    const projects = useMatch('/projects');
    const teams = useMatch('/teams');

    const { user } = useSelector((state) => state.auth) || {};
    const { name, avatar } = user || {};
    const dispatch = useDispatch();

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...arg) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                fn(...arg);
            }, delay);
        };
    };

    const doSearch = (value) => {
        dispatch(getSearchKeyword(value));
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };

    return (
        <div className="flex items-center justify-between py-3 px-10 bg-white bg-opacity-75">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-10 w-10" />

                <div className="flex gap-1 ml-10">
                    <Link
                        className={`text-sm font-semibold transition delay-75 ease-in-out py-2 px-3 rounded-lg hover:bg-violet-200 hover:text-violet-800 ${
                            teams ? 'bg-violet-200 text-violet-800' : 'text-gray-800'
                        }`}
                        to="/teams"
                    >
                        Teams
                    </Link>
                    <Link
                        className={`text-sm font-semibold transition delay-75 ease-in-out py-2 px-3 rounded-lg hover:bg-violet-200 hover:text-violet-800 ${
                            projects ? 'bg-violet-200 text-violet-800' : 'text-gray-800'
                        }`}
                        to="/projects"
                    >
                        Projects
                    </Link>
                </div>

                <input
                    className={`flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 transition delay-75  ease-in-out translate-x-0 ${
                        !projects && '-translate-x-[800px]'
                    } rounded-full focus:outline-none focus:ring focus:ring-violet-300`}
                    type="search"
                    placeholder="Search for anything…"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    className="flex gap-3 items-center py-2 px-4 transition delay-75 ease-in-out hover:bg-violet-200 font-semibold hover:text-violet-800 rounded-lg"
                >
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <span>Logout</span>
                </button>
                <div>
                    <div className="flex items-center gap-3 py-1 px-3 transition delay-75 ease-in-out rounded-lg hover:bg-violet-200 hover:text-violet-800 cursor-pointer">
                        <span className="font-semibold text-gray-600 normal-case">
                            {name}
                        </span>
                        <div className="w-8 rounded-full">
                            <img className='rounded-full' src={avatar} alt={name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
