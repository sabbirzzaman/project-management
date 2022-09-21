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
        getProjects: builder.query({
            query: () => `/projects`
        }),
    }),
});

export const { useAddProjectMutation, useGetProjectsQuery } = projectsApi;
