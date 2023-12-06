import React from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductForm from '../features/admin/components/AdminProductForm';
const AdminProductFormPage = () => {
    return (
        <div>
            <Navbar />
            <h1 className='text-center bg-lime-500'><b>Admin Panel -</b> Add / Edit Form</h1>
            <AdminProductForm />
        </div>
    )
}

export default AdminProductFormPage

