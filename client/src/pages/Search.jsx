import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchSuccess } from '../redux/videosSlice'
import Card from '../components/Card'
import { Container } from './search-styled-components.js'

const Search = () => {
	const { videos } = useSelector(state => state.videos)
	const query = useLocation().search
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await axios.get(`/videos/search${query}`)
			dispatch(fetchSuccess(res.data))
		}
		fetchVideos()
	}, [query, dispatch])

	return (
		<Container>
			{videos && videos.map(video => <Card key={video._id} video={video} />)}
		</Container>
	)
}

export default Search
