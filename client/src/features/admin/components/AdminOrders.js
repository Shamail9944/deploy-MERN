import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITEMS_PER_PAGE } from '../../../app/constants'
import { FetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice'
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import Pagination from './../../common/Pagination';


const AdminOrders = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const orders = useSelector(selectOrders)
    const totalOrders = useSelector(selectTotalOrders)
    const [editableOrderId, setEditableOrderId] = useState(-1)

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(FetchAllOrdersAsync({ pagination }))
    }, [dispatch, page])


    const handlePage = (page) => {
        setPage(page)
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(FetchAllOrdersAsync({ pagination }))
    }
    const handleShow = () => { console.log("Show") }
    const handleEdit = (order) => {
        setEditableOrderId(order.id)
    }
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1)
    }
    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600'
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600'
            case 'delivered':
                return 'bg-green-200 text-green-600'
            case 'cancelled':
                return 'bg-red-200 text-red-600'
            default:
                return 'bg-purple-200 text-purple-600'
        }
    }


    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full mx-10">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">Order No</th>
                                    <th className="py-3 px-6 text-left">Items</th>
                                    <th className="py-3 px-6 text-center">Total</th>
                                    <th className="py-3 px-6 text-center">Shipping Address</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {/* bg-gray-50 hover:bg-gray-100 */}
                                {orders.map(order =>
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="">
                                                {order.id}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {order.cartItems.map((item, index) =>
                                                <div key={index} className="flex items-center justify-left">
                                                    <div className="mr-2">
                                                        <img alt=""
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.thumbnail}
                                                        />
                                                    </div>
                                                    <span>{item.quantity}x {item.title}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                $ {order.totalAmount}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center justify-center">
                                                Name - {order.selAddress.name}<br />
                                                Contact - {order.selAddress.contact}<br />
                                                Address - House#{order.selAddress.house}, St#{order.selAddress.street}<br />
                                                {order.selAddress.city}, {order.selAddress.region}, {order.selAddress.country}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {order.id === editableOrderId ?
                                                (<select onChange={e => handleUpdate(e, order)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>)
                                                :
                                                (<span className={`
                                                ${chooseColor(order.status)}
                                                py-1 px-3 rounded-full text-xs`}>
                                                    {order.status}
                                                </span>)
                                            }
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <EyeIcon className='w-5 h-5' onClick={e => handleShow(order)} />
                                                </div>
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <PencilIcon className='w-5 h-5' onClick={e => handleEdit(order)} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItems={totalOrders} />
            </div>
        </div>
    )
}

export default AdminOrders