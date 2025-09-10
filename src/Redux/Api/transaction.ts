import baseApi from "./baseApi";

const transaction = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTransaction: build.query({
            query: ({page, limit,}) => ({
                url: `/admin/payment/all?page=${page}&limit=${limit}`,
                method: "GET"
            }),
            providesTags: ["transaction"]
        })
    })
})


export const { useGetAllTransactionQuery } = transaction