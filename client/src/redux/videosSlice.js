import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	videos: [],
	loading: false,
	error: false,
}

export const videosSlice = createSlice({
	name: 'videos',
	initialState,
	reducers: {
		fetchStart: state => {
			state.loading = true
		},
		fetchSuccess: (state, action) => {
			state.loading = false
			state.videos = action.payload
		},
		fetchFailure: state => {
			state.loading = false
			state.error = true
		},
		deleteVideo: (state, action) => {
			state.videos = state.videos.filter(v => v._id === action._id)
		},
	},
})

export const { fetchStart, fetchSuccess, fetchFailure, deleteVideo } =
	videosSlice.actions

export default videosSlice.reducer
