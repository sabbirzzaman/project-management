import { apiSlice } from '../api/apiSlice';

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTeams: builder.query({
            query: ({team}) => `/teams?team=${team}`,
        }),
        getTeams: builder.query({
            query: (email) => `/teams?q=${email}`,
        }),
        getTeam: builder.query({
            query: ({email, team}) => `/teams?q=${email}&team=${team}`,
        }),
        getTeamInfo: builder.query({
            query: (id) => `/teams/${id}`,
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
                            apiSlice.util.updateQueryData(
                                'getTeams',
                                email,
                                (draft) => {
                                    draft.push(data);
                                }
                            )
                        );
                    }
                } catch (err) {}
            },
        }),
        addTeamMember: builder.mutation({
            query: ({ id, data }) => ({
                url: `/teams/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                try {
                    const { data } = (await queryFulfilled) || {};
                    const { email } = data || {};

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getTeams',
                            email,
                            (draft) => {
                                const team = draft.find((t) => Number(t.id) === Number(id));
                                team.members = data.members;
                            }
                        )
                    );
                } catch (err) {}
            },
        }),
    }),
});

export const {
    useGetAllTeamsQuery,
    useGetTeamsQuery,
    useGetTeamQuery,
    useGetTeamInfoQuery,
    useAddTeamsMutation,
    useAddTeamMemberMutation,
} = teamsApi;
