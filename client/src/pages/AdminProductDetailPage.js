import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductDetail from '../features/admin/components/AdminProductDetail';
const AdminProductDetailPage = () => {
    return (
        <div>
            <Navbar />
            <h1 className='text-center bg-lime-500'><b>Admin Panel -</b> You are now in Admin Mode</h1>
            <AdminProductDetail />
        </div>
    )
}

export default AdminProductDetailPage