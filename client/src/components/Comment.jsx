import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import {
	Container,
	Details,
	Avatar,
	Name,
	Date,
	Text,
} from './comment-styled-components.js'

const Comment = ({ comment }) => {
	const [channel, setChannel] = useState({})

	useEffect(() => {
		const fetchComment = async () => {
			const res = await axios.get(`/users/find/${comment.userId}`)
			setChannel(res.data)
		}
		fetchComment()
	}, [comment.userId])

	return (
		<Container>
			<Avatar src={channel.img} />
			<Details>
				<Name>
					{channel.name} <Date>{format(comment.createdAt)}</Date>
				</Name>
				<Text>{comment.desc}</Text>
			</Details>
		</Container>
	)
}

export default Comment
