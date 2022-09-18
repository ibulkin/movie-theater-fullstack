import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import MovieTheater from '../img/logo.svg'
import { Link } from 'react-router-dom'
import Mern from '../img/mern.svg'
import {
	Container,
	Wrapper,
	Img1,
	Img,
	Li,
	Hr,
	Icons,
} from './about-styled-components.js'

const About = ({ type }) => {
	return (
		<Container>
			<ul>
				<Li>
					Welcome to &nbsp;
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						<Img src={MovieTheater} />
						&nbsp;, Video Sharing Site.
					</Link>
				</Li>
				<Li>Any user will be able to view any video.</Li>
				<Li>
					For your convenience, videos of the same categories will be located
					near the video being watched.
				</Li>
				<Li>Only a registered user can add, remove and comment on videos.</Li>
				<Li>
					Only a registered user can subscribe to the author of the video.
				</Li>
				<Li>
					For your convenience, the site implements authorization through
					Google.
				</Li>
				<Hr />
				<Li>Technologies used on the site:</Li>
			</ul>
			<Wrapper>
				<Img1 src={Mern} />
			</Wrapper>
			<Hr />
			<Icons>
				<a
					href='https://api.whatsapp.com/send?phone=972545968599'
					target='_blank'
					rel='noopener noreferrer'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<WhatsAppIcon />
				</a>
				<a
					href='mailto:ibulkin@gmail.com'
					target='_blank'
					rel='noopener noreferrer'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<EmailIcon />
				</a>
				<a
					href='https://www.facebook.com/igor.bulkin.9'
					target='_blank'
					rel='noopener noreferrer'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<FacebookSharpIcon />
				</a>
			</Icons>
		</Container>
	)
}

export default About
