import React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const RequireAuth = ({ children }) => {
	const { user } = useSelector((state) => state.auth);

	const location = useLocation();

	// if (loading) {
	// 	return <Loading></Loading>;
	// }

	if (!user) {
		return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>;
	} else {
		return children;
	}
};

export default RequireAuth;
