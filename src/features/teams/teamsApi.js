import { apiSlice } from '../api/apiSlice';

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => `/teams?q=${email}`,
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
        }),
    }),
});

export const {
    useGetTeamsQuery,
    useAddTeamsMutation,
    useAddTeamMemberMutation,
} = teamsApi;
