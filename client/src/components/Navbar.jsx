import React, { useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Upload from './Upload'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from '../redux/userSlice'
import {
	Container,
	Wrapper,
	Item,
	Button,
	Search,
	Input,
	User,
	Avatar,
} from './navbar-styled-components.js'

const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const [q, setQ] = useState('')
	const { currentUser } = useSelector(state => state.user)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<>
			<Container>
				<Wrapper>
					<Search>
						<Input placeholder='Search' onChange={e => setQ(e.target.value)} />
						<SearchOutlinedIcon
							onClick={() => q && navigate(`/search?q=${q}`)}
						/>
					</Search>
					{currentUser ? (
						<>
							<User>
								<Item>
									<VideoCallOutlinedIcon
										fontSize='large'
										onClick={() => setOpen(true)}
									/>
								</Item>
								<Avatar src={currentUser?.img} />
								{currentUser.name}
							</User>
							<Item>
								<LogoutIcon onClick={handleLogout} />
							</Item>
						</>
					) : (
						<Link to='signin' style={{ textDecoration: 'none' }}>
							<Button>
								<AccountCircleOutlinedIcon />
								SIGN IN
							</Button>
						</Link>
					)}
				</Wrapper>
			</Container>
			{open && <Upload setOpen={setOpen} />}
		</>
	)
}

export default Navbar