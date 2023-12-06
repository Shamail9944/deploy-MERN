/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';
import { Navigate } from 'react-router-dom';
import { discountPrice } from '../../../app/constants';

const UserOrder = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo)
    const orders = useSelector(selectUserOrders)

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [dispatch, user.id])

    return (
        <div className="mx-auto max-w-xl px-2 sm:px-6 lg:px-8 bg-white">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-2 mb-2 text-center">My Orders</h1>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6 mb-2">
                {!orders.length && <Navigate to="/" replace={true}></Navigate>}

                <div className="flow-root">
                    <ul className="-my-2 divide-y divide-gray-200 border border-solid border-grey-900 rounded-lg p-6">
                        {orders.map((order) => (
                            <li key={order.id} className="flex flex-col py-1">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-6 mb-1 text-center">Order # {order.id}</h1>

                                <ul className="-my-6 divide-y divide-gray-200">
                                    {order.cartItems.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.product.thumbnail}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.product.id}>{item.product.title}</a>
                                                        </h3>
                                                        <p className="ml-4">$ {discountPrice(item.product)}</p>
                                                        <p className="ml-4 line-through text-xs">$ {item.product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-black-500">
                                                        <label htmlFor="qty" className="block text-sm font-medium leading-6 mb-2 text-gray-900">
                                                            Quantity -  {item.quantity}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${order.totalAmount}</p>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Total Items Qty</p>
                                        <p>{order.totalItems} items</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3">Shipment Addresses</h2>

                                    <div className="flex justify-between gap-x-6 p-2 border-solid border-2 border-gray-300 rounded-lg mt-2">
                                        <div className="flex min-w-0 gap-x-4 items-center">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{order.selAddress.name}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selAddress.contact}</p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">
                                                {`House/Apartment - ${order.selAddress.house},${" "}
                                                            Street ${order.selAddress.street},`}
                                            </p>
                                            <p className="text-sm leading-6 text-gray-900">
                                                {`${order.selAddress.city},${` `}\n
                                                            ${order.selAddress.region},${" "}
                                                            ${order.selAddress.country}.`}
                                            </p>
                                            <p className="text-sm leading-6 text-gray-500">
                                                Postal Code - {order.selAddress.postalCode}
                                            </p>
                                        </div>
                                    </div>

                                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3">Order Status</h2>
                                    <div className="gap-x-6 p-2 border-solid border-2 border-gray-300 rounded-lg mt-2">
                                        <h1 className="text-lg font-bold tracking-tight text-gray-900 text-center">{order.status}</h1>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default UserOrder