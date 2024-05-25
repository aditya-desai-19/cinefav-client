import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {

	return (
		<Provider store={store}>
			<div className='bg-black'>
				<Navbar />
				<Outlet />
			</div>
		</Provider>
	)
}

export default App
