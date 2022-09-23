import { apiSlice } from '../api/apiSlice';

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `/projects`,
        }),
        addProject: builder.mutation({
            query: (data) => ({
                url: '/projects',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg);
                const result = dispatch(
                    apiSlice.util.updateQueryData(
                        'getProjects',
                        undefined,
                        (draft) => {
                            draft.push(arg);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (err) {
                    result.undo();
                }
            },
        }),
        editProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/projects/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                const result = dispatch(
                    apiSlice.util.updateQueryData(
                        'getProjects',
                        undefined,
                        (draft) => {
                            const draggedProject = draft.find(
                                (project) => Number(project.id) === Number(id)
                            );

                            draggedProject.status = data.status;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (err) {
                    result.undo();
                }
            },
        }),
    }),
});

export const {
    useAddProjectMutation,
    useGetProjectsQuery,
    useEditProjectMutation,
} = projectsApi;
