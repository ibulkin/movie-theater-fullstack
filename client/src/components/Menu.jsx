import React, { useState } from 'react'
import axios from 'axios'
import MovieTheater from '../img/logo.svg'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import InfoIcon from '@mui/icons-material/Info'
import { setDarkMode, setLightMode } from '../redux/themeSlice'
import { fetchSuccess } from '../redux/videosSlice'
import {
	Container,
	Wrapper,
	Logo,
	Img,
	Item,
	Hr,
	Login,
	Button,
	Title,
} from './menu-styled-components.js'

const Menu = () => {
	const { currentUser } = useSelector(state => state.user)
	const { isDarkMode } = useSelector(state => state.theme)
	const [selectedMenuItem, setSelectedMenuItem] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const tags = [
		{ name: 'Action' },
		{ name: 'Crime' },
		{ name: 'Comedy' },
		{ name: 'Drama' },
		{ name: 'Thriller' },
		{ name: 'War' },
	]

	const fetchVideosByTag = async tag => {
		const res = await axios.get(`/videos/tags?tags=${tag}`)
		dispatch(fetchSuccess(res.data))
	}
	const setMenuItem = itemName => {
		setSelectedMenuItem(itemName)
		if (itemName !== 'About') {
			navigate('/')
		}
	}

	return (
		<Container>
			<Wrapper>
				<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Logo>
						<Img src={MovieTheater} />
					</Logo>
					<Item
						onClick={() => setMenuItem('Home')}
						isSelected={selectedMenuItem === 'Home'}
					>
						<HomeIcon />
						Home
					</Item>
				</Link>
				<Link to='trends' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Item
						onClick={() => setMenuItem('Explore')}
						isSelected={selectedMenuItem === 'Explore'}
					>
						<ExploreOutlinedIcon />
						Explore
					</Item>
				</Link>
				<Link
					to='subscriptions'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<Item
						onClick={() => setMenuItem('Subscriptions')}
						isSelected={selectedMenuItem === 'Subscriptions'}
					>
						<SubscriptionsOutlinedIcon />
						Subscriptions
					</Item>
				</Link>
				<Hr />
				{!currentUser && (
					<>
						<Login>
							Sign in to like videos, comment, and subscribe.
							<Link to='signin' style={{ textDecoration: 'none' }}>
								<Button>
									<AccountCircleOutlinedIcon />
									SIGN IN
								</Button>
							</Link>
						</Login>
						<Hr />
					</>
				)}
				<Title>BEST OF MovieTheater</Title>
				{tags.map(tag => (
					<Item
						key={tag.name}
						isSelected={tag.name === selectedMenuItem}
						onClick={() => {
							setMenuItem(tag.name)
							fetchVideosByTag(tag.name)
						}}
					>
						<MovieFilterIcon />
						{tag.name}
					</Item>
				))}
				<Hr />

				<Link to='about' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Item
						onClick={() => setMenuItem('About')}
						isSelected={selectedMenuItem === 'About'}
					>
						<InfoIcon />
						About
					</Item>
				</Link>
				<Hr />
				<Item
					onClick={() =>
						isDarkMode ? dispatch(setLightMode()) : dispatch(setDarkMode())
					}
				>
					<SettingsBrightnessOutlinedIcon />
					{isDarkMode ? 'Light' : 'Dark'} Mode
				</Item>
				<Hr />
				<Item>
					<p>© Igor Bulkin, 2022</p>
				</Item>
			</Wrapper>
		</Container>
	)
}

export default Menu
