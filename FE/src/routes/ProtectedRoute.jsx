import React from 'react'
import useAuthStore from '../store/authStore'
import { Navigate } from 'react-router'
import { notifyError } from '../utils/toast'

export function ProtectedRoute({children}) {
    let {user}=useAuthStore()
    console.log(user);
    if (!user) {
      notifyError('please login to access')
        return <Navigate to={'/login'}/>
    }
  return children;
}
export function ProtectedAdmin({children}) {
    let {user}=useAuthStore()
    if (user?.role!='admin') {
        notifyError('you are not allowed to access')
        return <Navigate to={'/client'}/>
    }
  return children;
}
export function RedirectUser({children}) {
    let {user}=useAuthStore()
    if (user) {
        return <Navigate to={'/client'}/>
    }
  return children;
}
