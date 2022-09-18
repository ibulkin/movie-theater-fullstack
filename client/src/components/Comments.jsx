import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import {
	Container,
	Avatar,
	NewComment,
	Input,
} from './comments-styled-components.js'

const Comments = ({ videoId }) => {
	const { currentUser } = useSelector(state => state.user)
	const [comments, setComments] = useState([])

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await axios.get(`/comments/${videoId}`)
				setComments(res.data)
			} catch (err) {}
		}
		fetchComments()
	}, [videoId])

	const addComment = async e => {
		if (e.key === 'Enter') {
			const desc = e.target.value
			e.target.blur()
			e.target.value = ''
			const comment = { userId: currentUser._id, videoId, desc }
			const res = await axios.post('/comments', comment)
			res.status === 200 && comments.push(comment)
		}
	}
	return (
		currentUser && (
			<Container>
				<NewComment>
					<Avatar src={currentUser.img} />
					<Input placeholder='Add a comment...' onKeyDown={addComment} />
				</NewComment>
				{comments.map(comment => (
					<Comment key={comment._id} comment={comment} />
				))}
			</Container>
		)
	)
}

export default Comments