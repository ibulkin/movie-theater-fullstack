import React, { useEffect, useState } from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'
import Comments from '../components/Comments'
// import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { dislike, fetchSuccess, like, remove } from '../redux/videoSlice'
import { deleteVideo } from '../redux/videosSlice'
import { format } from 'timeago.js'
import { subscription } from '../redux/userSlice'
import Recommendation from '../components/Recommendation'
import {
	Container,
	VideoWrapper,
	VideoFrame,
	Content,
	Title,
	Hr,
	Details,
	Info,
	Buttons,
	Button,
	Channel,
	ChannelInfo,
	ChannelDetail,
	ChannelName,
	Image,
	ChannelCounter,
	Description,
	Subscribe,
} from './video-styled-components.js'

const Video = () => {
	const { currentUser } = useSelector(state => state.user)
	const { currentVideo } = useSelector(state => state.video)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const path = useLocation().pathname.split('/')[2]

	const [channel, setChannel] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const videoRes = await axios.get(`/videos/find/${path}`)
				const channelRes = await axios.get(
					`/users/find/${videoRes.data.userId}`
				)
				setChannel(channelRes.data)
				dispatch(fetchSuccess(videoRes.data))
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [path, dispatch])

	const handleLike = async () => {
		if (currentUser) {
			await axios.put(`/users/like/${currentVideo._id}`)
			dispatch(like(currentUser._id))
		}
	}
	const handleDislike = async () => {
		if (currentUser) {
			await axios.put(`/users/dislike/${currentVideo._id}`)
			dispatch(dislike(currentUser._id))
		}
	}

	const handleSub = async () => {
		currentUser.subscribedUsers.includes(channel._id)
			? await axios.put(`/users/unsub/${channel._id}`)
			: await axios.put(`/users/sub/${channel._id}`)
		dispatch(subscription(channel._id))
	}

	const handleDelete = async () => {
		await axios.delete(`/videos/${currentVideo._id}`)
		dispatch(deleteVideo(currentVideo))
		dispatch(remove())
		navigate(`/`)
	}

	return (
		<Container>
			{currentVideo ? (
				<>
					<Content>
						<VideoWrapper>
							<VideoFrame src={currentVideo.videoUrl} controls />
						</VideoWrapper>
						<Title>{currentVideo.title}</Title>
						<Details>
							<Info>
								{currentVideo.views} views • {format(currentVideo.createdAt)}
							</Info>
							<Buttons>
								<Button onClick={handleLike}>
									{currentVideo.likes?.includes(currentUser?._id) ? (
										<ThumbUpIcon />
									) : (
										<ThumbUpOutlinedIcon />
									)}{' '}
									{currentVideo.likes?.length}
								</Button>
								<Button onClick={handleDislike}>
									{currentVideo.dislikes?.includes(currentUser?._id) ? (
										<ThumbDownIcon />
									) : (
										<ThumbDownOffAltOutlinedIcon />
									)}{' '}
									Dislike
								</Button>
								{currentVideo.userId === currentUser?._id && (
									<Button onClick={handleDelete}>
										<DeleteIcon /> Delete
									</Button>
								)}
							</Buttons>
						</Details>
						<Hr />
						<Channel>
							<ChannelInfo>
								<Image src={channel.img} />
								<ChannelDetail>
									<ChannelName>{channel.name}</ChannelName>
									<ChannelCounter>
										{channel.subscribers} subscribers
									</ChannelCounter>
									<Description>{currentVideo.desc}</Description>
								</ChannelDetail>
							</ChannelInfo>
							<Subscribe onClick={handleSub}>
								{currentUser?.subscribedUsers?.includes(channel._id)
									? 'SUBSCRIBED'
									: 'SUBSCRIBE'}
							</Subscribe>
						</Channel>
						<Hr />
						<Comments videoId={currentVideo._id} />
					</Content>
					<Recommendation tags={currentVideo.tags} />{' '}
				</>
			) : null}
		</Container>
	)
}

export default Video
