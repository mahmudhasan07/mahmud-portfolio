// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.helper-llc.com/api/v1', // Replace with your API's base URL
        // baseUrl: 'http://localhost:6005/api/v1', // Replace with your API's base URL
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken") // Assuming token is stored in the auth slice
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["approveEvent", "allEvents", "logIn", "transaction", "allUsers", "allCreators", "complains", "updateSubscription", "dashboardInfo"]
});

// Export hooks for usage in functional components
export default baseApi;
