import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isDarkMode: true,
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setDarkMode: state => {
			state.isDarkMode = true
		},
		setLightMode: state => {
			state.isDarkMode = false
		},
	},
})

export const { setDarkMode, setLightMode } = themeSlice.actions

export default themeSlice.reducer
