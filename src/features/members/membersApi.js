import { apiSlice } from '../api/apiSlice';

export const membersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMember: builder.query({
            query: ({teamId, email}) => `/members?teamId_like=${teamId}&email=${email}`,
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

export const { useAddMemberMutation, useGetMemberQuery } = membersApi;
