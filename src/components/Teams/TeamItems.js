import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMembersQuery } from '../../features/members/membersApi';
import { useGetTeamsQuery } from '../../features/teams/teamsApi';
import TeamItem from './TeamItem';

const TeamItems = () => {
    const { user } = useSelector((state) => state.auth) || {};

    const [myTeams, setMyTeams] = useState(undefined);

    const { data: teams, isLoading: isTeamsLoad, isError: isTeamsError } = useGetTeamsQuery(user?.email);
    const { data: members, isLoading: isMembersLoad, } = useGetMembersQuery(user?.email);

    // filter my teams
    if(!isTeamsLoad && !isMembersLoad && teams?.length > 0 && members?.length > 0) {
        members.forEach(member => {
            const {teamId} = member || {}
            // teams.filter(team => )
        })
    }

    // manage content
    let content;

    if (isTeamsLoad) {
        content = <div className="px-10 mt-4">Loading...</div>;
    } else if (!isTeamsLoad && isTeamsError) {
        content = <div className="px-10 mt-4">Something went wrong!</div>;
    } else if (!isTeamsLoad && !isTeamsError && teams.length === 0) {
        content = <div className="px-10 mt-4">No team founded!</div>;
    } else if (!isTeamsLoad && !isTeamsError && teams.length > 0) {
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
