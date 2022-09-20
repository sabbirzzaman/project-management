import { apiSlice } from '../api/apiSlice';

export const membersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query({
            query: (email) => `/members?email=${email}`,
        }),
        getMember: builder.query({
            query: ({ teamId, email }) =>
                `/members?teamId_like=${teamId}&email=${email}`,
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

export const { useGetMembersQuery, useAddMemberMutation, useGetMemberQuery } =
    membersApi;
