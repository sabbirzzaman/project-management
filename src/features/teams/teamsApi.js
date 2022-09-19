import { apiSlice } from '../api/apiSlice';
import { membersApi } from '../members/membersApi';

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
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = (await queryFulfilled) || {};

                    const { id, email } = data || {};

                    if (id) {
                        dispatch(
                            membersApi.endpoints.addMember.initiate({teamId: id, email})
                        )
                    }
                } catch (err) {}
            },
        }),
    }),
});

export const { useGetTeamsQuery, useAddTeamsMutation } = teamsApi;
