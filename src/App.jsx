//@ts-check
import React, { useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import store from './redux/store'
import Cookies from 'js-cookie'
import { signIn } from './redux/slices/userSlice.js'

const App = () => {
	const dispatch = useDispatch();

	const updateUser = useCallback((user) => {
		if (user && user.length) {
			dispatch(signIn(JSON.parse(user)));
		}
	}, [dispatch]);

	useEffect(() => {
		const user = Cookies.get('user');
		console.info({ user });
		updateUser(user);
	}, []);

	return (
		<div className='bg-blackbg'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default App
