import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from '../../features/teams/teamsApi';
import TeamItem from './TeamItem';

const TeamItems = () => {
    const { user } = useSelector((state) => state.auth) || {};

    const { data: teams, isLoading, isError } = useGetTeamsQuery(user?.email);

    // manage content
    let content;

    if (isLoading) {
        content = <div className='px-10 mt-4'>Loading...</div>;
    } else if (!isLoading && isError) {
        content = <div className='px-10 mt-4'>Something went wrong!</div>;
    } else if (!isLoading && !isError && teams.length === 0) {
        content = <div className='px-10 mt-4'>No team founded!</div>;
    } else if (!isLoading && !isError && teams.length > 0) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
                {teams.map((team) => (
                    <TeamItem key={team.id} team={team} />
                ))}
            </div>
        );
    }

    return content;
};

export default TeamItems;
