import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signoutAsync } from '../authSlice'
import { Navigate } from 'react-router-dom';

const SignOut = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    useEffect(() => {
        dispatch(signoutAsync())
    }, [dispatch])

    return (
        <>
            {!user && <Navigate to='/login' replace={true}></Navigate>}
        </>
    )
}

export default SignOut