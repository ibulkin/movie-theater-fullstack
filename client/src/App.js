import { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import { darkTheme, lightTheme } from './utils/Theme'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import SignIn from './pages/SignIn'
import Search from './pages/Search'
import About from './pages/About'
import { useSelector } from 'react-redux'
import { Container, Main, Wrapper } from './app-styled-components.js'

function App() {
	const { currentUser } = useSelector(state => state.user)
	const { isDarkMode } = useSelector(state => state.theme)

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<Container>
				<BrowserRouter>
					<Menu />
					<Main>
						<Navbar />
						<Wrapper>
							<Routes>
								<Route path='/'>
									<Route index element={<Home type='random' />} />
									<Route path='trends' element={<Home type='trend' />} />
									<Route path='subscriptions' element={<Home type='sub' />} />
									<Route path='search' element={<Search />} />
									<Route path='about' element={<About />} />
									<Route
										path='signin'
										element={currentUser ? <Home /> : <SignIn />}
									/>
									<Route path='video'>
										<Route path=':id' element={<Video />} />
									</Route>
								</Route>
							</Routes>
						</Wrapper>
					</Main>
				</BrowserRouter>
			</Container>
		</ThemeProvider>
	)
}

export default App
