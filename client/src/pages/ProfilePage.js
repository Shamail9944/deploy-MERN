import React from 'react'
import Navbar from './../features/navbar/Navbar';
import UserProfile from '../features/user/components/UserProfile';

const ProfilePage = () => {
    return (
        <div>
            <Navbar />
            <UserProfile />
        </div>
    )
}

export default ProfilePage