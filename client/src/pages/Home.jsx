import React, { useEffect } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuccess } from '../redux/videosSlice'
import { Container } from './home-styled-components.js'

const Home = ({ type }) => {
	const { videos } = useSelector(state => state.videos)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchVideosByType = async () => {
			const res = await axios.get(`/videos/${type}`)
			dispatch(fetchSuccess(res.data))
		}
		fetchVideosByType()
	}, [type, dispatch])

	return (
		<Container>
			{videos && videos.map(video => <Card key={video._id} video={video} />)}
		</Container>
	)
}

export default Home
