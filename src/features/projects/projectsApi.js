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
                try {
                    const { data } = (await queryFulfilled) || {};
                    const { id } = data || {};

                    if (id) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getProjects',
                                undefined,
                                (draft) => {
                                    draft.push({...arg, id});
                                }
                            )
                        );
                    }
                } catch (err) {}
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
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = dispatch(
                    apiSlice.util.updateQueryData(
                        'getProjects',
                        undefined,
                        (draft) => {
                            const updatedProjects = draft.filter(
                                (project) => Number(project.id) !== Number(arg)
                            );

                            return [...updatedProjects]
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
    useDeleteProjectMutation,
} = projectsApi;
