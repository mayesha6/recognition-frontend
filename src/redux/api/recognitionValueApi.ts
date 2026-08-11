import { baseApi } from "./baseApi";

export const recognitionValueApi = baseApi
    .enhanceEndpoints({ addTagTypes: ["RecognitionValue"] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecognitionValues: builder.query<any, void>({
                query: () => ({
                    url: "/recognition-value",
                    method: "GET",
                }),
                providesTags: ["RecognitionValue"],
            }),

            createRecognitionValue: builder.mutation<any, { name: string; description?: string }>({
                query: (data) => ({
                    url: "/recognition-value",
                    method: "POST",
                    body: data,
                }),
                invalidatesTags: ["RecognitionValue"],
            }),

            updateRecognitionValue: builder.mutation<
                any,
                { id: string; name: string; description?: string }
            >({
                query: ({ id, ...data }) => ({
                    url: `/recognition-value/${id}`,
                    method: "PATCH",
                    body: data,
                }),
                invalidatesTags: ["RecognitionValue"],
            }),

            deleteRecognitionValue: builder.mutation<any, string>({
                query: (id) => ({
                    url: `/recognition-value/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["RecognitionValue"],
            }),
        }),
    });

export const {
    useGetRecognitionValuesQuery,
    useCreateRecognitionValueMutation,
    useUpdateRecognitionValueMutation,
    useDeleteRecognitionValueMutation,
} = recognitionValueApi;