import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductList from '../features/admin/components/AdminProductList';

const AdminHome = () => {
    return (
        <div>
            <Navbar />
            <h1 className='text-center bg-lime-500'><b>Admin Panel -</b> You are now in Admin Mode</h1>
            <AdminProductList />

        </div>
    )
}

export default AdminHome