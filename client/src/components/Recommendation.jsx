import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuccess } from '../redux/videosSlice'
import Card from './Card'
import { Container } from './recommendation-styled-components.js'

const Recommendation = ({ tags }) => {
	const { videos } = useSelector(state => state.videos)

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await axios.get(`/videos/tags?tags=${tags}`)
			dispatch(fetchSuccess(res.data))
		}
		fetchVideos()
	}, [tags, dispatch])

	return (
		<Container>
			{videos &&
				videos.map(video => <Card type='sm' key={video._id} video={video} />)}
		</Container>
	)
}

export default Recommendation
