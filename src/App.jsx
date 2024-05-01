import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import AuthContext from './utils/AuthContext'
import Cookies from 'js-cookie'

const App = () => {
	const [authToken, setAuthToken] = useState(null);

	const handleToken = useCallback((token) => {
		setAuthToken(token);
	},[authToken]);

	useEffect(() => {
		const token = Cookies.get('authToken');
		if(token) {
			setAuthToken(token);
		}
	}, [authToken]);

	return (
		<>
			<AuthContext.Provider value={{authToken, handleToken}}>
				<Navbar />
				<Outlet />
			</AuthContext.Provider>
		</>
	)
}

export default App
