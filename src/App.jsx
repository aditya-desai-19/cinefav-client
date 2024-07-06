//@ts-check
import React, { useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { signIn } from './redux/slices/userSlice.js'
import { Toaster } from 'react-hot-toast';
import Movies from './components/Movies'

const App = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.user);

	const updateUser = useCallback((user) => {
		try {
			if (user && user.length) {
				dispatch(signIn(JSON.parse(user)));
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const user = Cookies.get('user');
		updateUser(user);
	}, []);

	return (
		<div className='bg-blackbg h-full w-full'>
			<Navbar />
			{JSON.stringify(currentUser) !== "{}" ? <Movies currentUser={currentUser} /> : <h2 className=' text-center text-2xl text-white'>Login first...</h2>}
			<Outlet />
			<Toaster />
		</div>
	)
}

export default App
