import { useSelector } from 'react-redux';
import React from 'react'
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({children}) => {
    const { isAuthenticated } = useSelector((store) => store.user);
  

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    return children;
}


export const AuthenticatedUser = ({children}) => {
  const {isAuthenticated} = useSelector(store=>store.user);

  if(isAuthenticated){
      return <Navigate to="/"/>
  }

  return children;
}

export const AdminRoute = ({children}) => {
  const {user, isAuthenticated} = useSelector(store=>store.user);

  if(!isAuthenticated){
      return <Navigate to="/login"/>
  }

  if(user?.role !== "admin"){
      return <Navigate to="/"/>
  }

  return children;
}
