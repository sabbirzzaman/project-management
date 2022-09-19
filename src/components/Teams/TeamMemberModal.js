import React, { useEffect, useState } from 'react';
import {
    useAddMemberMutation,
    useGetMemberQuery,
} from '../../features/members/membersApi';
import { useGetUserQuery } from '../../features/users/usersApi';
import isValidEmail from '../../utils/isValidEmail';
import Error from '../common/Error';

const TeamCardModal = ({ id, setIsOpen }) => {
    // local state
    const [email, setEmail] = useState('');
    const [skipUserReq, setSkipUserReq] = useState(true);
    const [skipMemberReq, setSkipMemberReq] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const { data: user } = useGetUserQuery(email, { skip: skipUserReq });

    const { data: member } = useGetMemberQuery(
        { teamId: id, email },
        { skip: skipMemberReq }
    );

    const [addMember, { isLoading, isSuccess }] = useAddMemberMutation();

    useEffect(() => {
        if (user?.length > 0) {
            setSkipMemberReq(false);
        }
    }, [user]);

    useEffect(() => {
        if (user?.length > 0 && member?.length === 0) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [user, member]);

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
        if (isValidEmail(value)) {
            setEmail(value);
            setSkipUserReq(false);
        }
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const handleSubmit = (e) => {
        e.preventDefault();

        addMember({ email, teamId: id });
        setEmail('')
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
            <div className="bg-white w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10 cursor-default">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
                    Add team member!
                </h3>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Team title
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300"
                            disabled={disabled || isLoading}
                        >
                            Add member
                        </button>
                    </div>

                    {member?.length > 0 && (
                        <Error message={'Member already exist in the team!'} />
                    )}

                    {user?.length === 0 && (
                        <Error message={'No user founded!'} />
                    )}
                </form>
            </div>
        </div>
    );
};

export default TeamCardModal;
