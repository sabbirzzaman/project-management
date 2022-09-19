import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = (await queryFulfilled) || {};

                    const { accessToken, user } = data || {};

                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken,
                            user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken,
                            user,
                        })
                    );
                } catch (err) {}
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
