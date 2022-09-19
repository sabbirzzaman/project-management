import { apiSlice } from '../api/apiSlice';

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => `/teams?email_like=${email}`,
        }),
        addTeams: builder.mutation({
            query: (data) => ({
                url: '/teams',
                method: 'POST',
                body: data,
            })
        })
    }),
});

export const { useGetTeamsQuery, useAddTeamsMutation } = teamsApi;
