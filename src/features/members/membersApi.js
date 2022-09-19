import { apiSlice } from '../api/apiSlice';

export const membersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query({
            query: (teamId) => ``,
        }),
        addMember: builder.mutation({
            query: (data) => ({
                url: '/members',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useAddMemberMutation } = membersApi;
