import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useLoginMutation } from '../features/auth/authApi';
import logo from '../images/logo.png';

const Login = () => {
    // local states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // auth api
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return isLoading ? (
        <div className="h-screen flex bg-violet-100 items-center justify-center">
            <Oval
                height={50}
                width={50}
                color="#5b21b6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#ddd6fe"
                strokeWidth={4}
                strokeWidthSecondary={3}
            />
        </div>
    ) : (
        <div className="flex flex-col sm:flex-row-reverse items-center justify-center min-h-screen gap-5 bg-[#F9FAFB] bg-pattern">
            <div className="sm:min-h-[400px] min-w-[325px] bg-white flex items-center justify-center rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-14 w-auto"
                            src={logo}
                            alt="site logo"
                        />
                        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="sm:min-h-[400px] min-w-[325px] bg-white flex items-center justify-center rounded-lg shadow-lg py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full text-left space-y-8">
                    <div className="rounded-md -space-y-px">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="text-xl font-bold">
                                Some available users!
                            </h3>
                            <div
                                className="tooltip tooltip-left cursor-pointer flex"
                                data-tip="You can click on any email or password to skip typing!"
                            >
                                <FontAwesomeIcon
                                    className="bg-violet-300 text-violet-800 py-1 px-2 rounded"
                                    icon={faInfo}
                                />
                            </div>
                        </div>
                        <ul>
                            <li
                                onClick={() => setEmail('sztonmoy7@gmail.com')}
                                className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <span className="font-semibold">Email:</span>
                                <span>sztonmoy7@gmail.com</span>
                            </li>
                            <li
                                onClick={() => setEmail('test@test.com')}
                                className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <span className="font-semibold">Email:</span>
                                test@test.com
                            </li>
                            <li
                                onClick={() => setEmail('haha@haha.com')}
                                className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <span className="font-semibold">Email:</span>
                                haha@haha.com
                            </li>
                            <li
                                onClick={() => setPassword('123456')}
                                className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <span className="font-semibold">Password:</span>
                                123456
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
