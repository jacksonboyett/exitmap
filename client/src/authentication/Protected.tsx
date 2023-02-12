import { Navigate } from "react-router-dom";
import { useEffect } from 'react';

interface Props {
	children: any;
}

const Protected = (props: Props) => {
	
	let isLoggedIn = (localStorage.isLoggedIn === 'true')

	useEffect(() => {
	}, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};
export default Protected;
