import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import {
	Container,
	Image,
	Details,
	ChannelImage,
	ChannelName,
	Texts,
	Title,
	Info,
} from './card-styled-components.js'

const Card = ({ type, video }) => {
	const [channel, setChannel] = useState({})

	useEffect(() => {
		const fetchChannel = async () => {
			const res = await axios.get(`/users/find/${video.userId}`)
			setChannel(res.data)
		}
		fetchChannel()
	}, [video.userId])

	const updateViewCount = async () => {
		await axios.put(`/videos/view/${video._id}`)
	}
	return (
		<Link
			to={`/video/${video._id}`}
			onClick={updateViewCount}
			style={{ textDecoration: 'none' }}
		>
			<Container type={type}>
				<Image type={type} src={video.imgUrl} />
				<Details type={type}>
					<ChannelImage type={type} src={channel.img} />
					<Texts>
						<Title>{video.title}</Title>
						<ChannelName>{channel.name}</ChannelName>
						<Info>
							{video.views} views • {format(video.createdAt)}
						</Info>
					</Texts>
				</Details>
			</Container>
		</Link>
	)
}

export default Card
