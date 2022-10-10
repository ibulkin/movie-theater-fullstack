import styled from 'styled-components'

export const Container = styled.div`
	color: ${({ theme }) => theme.text};
	font-size: 20px;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 1000px;
`
export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`
export const Icons = styled.div`
	justify-content: center;
	gap: 15px;
	cursor: pointer;
	display: flex;
`
export const Img = styled.img`
	height: 40px;
	position: relative;
	top: 10px;
`
export const Li = styled.div`
	margin-bottom: 15px;
`
export const Img1 = styled.img`
	height: 350px;
`
export const Hr = styled.hr`
	margin: 15px 0px;
	border: 0.5px solid ${({ theme }) => theme.text};
`