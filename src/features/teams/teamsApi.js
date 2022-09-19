import { apiSlice } from '../api/apiSlice';

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => `/teams?email_like=${email}`,
        }),
    }),
});

export const { useGetTeamsQuery } = teamsApi;
