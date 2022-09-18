import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import app, { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
// import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import {
	Container,
	Wrapper,
	Title,
	SubTitle,
	Input,
	Button,
	Label
} from './signIn-styled-components.js'

const SignIn = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [image, setImage] = useState('')
	const [img, setImg] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()
		dispatch(loginStart())
		try {
			const res = await axios.post('/auth/signin', { name, password })
			dispatch(loginSuccess(res.data))
			navigate('/')
		} catch (err) {
			dispatch(loginFailure())
		}
	}

	const handleSingUp = async e => {
		e.preventDefault()
		dispatch(loginStart())
		try {
			const res = await axios.post('/auth/signup', {
				name,
				email,
				password,
				img,
			})
			dispatch(loginSuccess(res.data))
			navigate('/')
		} catch (err) {
			dispatch(loginFailure())
		}
	}

	const signInWithGoogle = async () => {
		dispatch(loginStart())
		signInWithPopup(auth, provider)
			.then(result => {
				axios
					.post('/auth/google', {
						name: result.user.displayName,
						email: result.user.email,
						img: result.user.photoURL,
					})
					.then(res => {
						console.log(res)
						dispatch(loginSuccess(res.data))
						navigate('/')
					})
			})
			.catch(error => {
				dispatch(loginFailure())
			})
	}

	const uploadFile = (file, urlType) => {
		const storage = getStorage(app)
		const fileName = new Date().getTime() + file.name
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			snapshot => {},
			error => {},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					setImg(downloadURL)
				})
			}
		)
	}

	useEffect(() => {
		image && uploadFile(image, 'imgUrl')
	}, [image])

	return (
		<Container>
			<Wrapper>
				<Title>Sign in</Title>
				<SubTitle>to continue to MovieTheater</SubTitle>
				<Input placeholder='username' onChange={e => setName(e.target.value)} />
				<Input
					type='password'
					placeholder='password'
					onChange={e => setPassword(e.target.value)}
				/>
				<Button onClick={handleLogin}>Sign in</Button>
				<Title>or</Title>
				<Button onClick={signInWithGoogle}>Signin with Google</Button>
				<Title>or</Title>
				<Input placeholder='username' onChange={e => setName(e.target.value)} />
				<Input placeholder='email' onChange={e => setEmail(e.target.value)} />
				<Input
					type='password'
					placeholder='password'
					onChange={e => setPassword(e.target.value)}
				/>
				<Input
					style={{ display: 'none' }}
					type='file'
					id='add'
					accept='image/*'
					onChange={e => setImage(e.target.files[0])}
				/>
				<Label htmlFor='add'><AddAPhotoIcon/>
				<span>Add an Avatar</span>
				</Label>

				<Button onClick={handleSingUp}>Sign up</Button>
			</Wrapper>
		</Container>
	)
}

export default SignIn
