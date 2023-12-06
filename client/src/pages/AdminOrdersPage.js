import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminOrders from '../features/admin/components/AdminOrders';
const AdminOrdersPage = () => {
    return (
        <div>
            <Navbar />
            <h1 className='text-center bg-lime-500'><b>Admin Panel -</b> You are now in Admin Mode</h1>
            <AdminOrders />
        </div>
    )
}

export default AdminOrdersPage