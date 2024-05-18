import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

const App = () => {

	return (
		<div className='h-full w-full'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default App
