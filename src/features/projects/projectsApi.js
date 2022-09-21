import { apiSlice } from '../api/apiSlice';

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProject: builder.mutation({
            query: (data) => ({
                url: '/projects',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useAddProjectMutation } = projectsApi;
