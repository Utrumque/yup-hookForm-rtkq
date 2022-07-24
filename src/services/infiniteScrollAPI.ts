import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { IUser } from "../models/IUser"

export const scrollApi = createApi({
	reducerPath: "scrollApi",
	tagTypes: ["Post"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
	refetchOnFocus: false,
	endpoints: (builder) => ({
		getAllUsers: builder.query<IUser[], []>({
			query: () => ({
				url: `users`,
			}),
		}),
		getUsers: builder.query<IUser[], number>({
			query: (page) => ({
				url: `users?_sort=id&_order=desc&_limit=35`,
				params: {
					_page: page,
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Post" as const, id })),
							{ type: "Post", id: "POST" },
					  ]
					: [{ type: "Post", id: "POST" }],
		}),
		postUser: builder.mutation<IUser[], {}>({
			query: (body) => ({
				url: `users`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Post"],
		}),
	}),
})

export const { useGetUsersQuery, useGetAllUsersQuery, usePostUserMutation } = scrollApi
