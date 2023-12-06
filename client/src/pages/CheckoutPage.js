/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deleteCartItemAsync, selectCartItems, updateCartAsync } from '../features/cart/cartSlice';
import Navbar from './../features/navbar/Navbar';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { addOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { discountPrice } from '../app/constants';

const CheckoutPage = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm()

    const cartItems = useSelector(selectCartItems)
    const totalAmount = cartItems.reduce((amount, item) => discountPrice(item.product) * item.quantity + amount, 0)
    const totalItems = cartItems.reduce((qty, item) => item.quantity + qty, 0)
    const handleQty = (e, item) => {
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
    }
    const handleRemove = (itemId) => {
        dispatch(deleteCartItemAsync(itemId))
    }

    const user = useSelector(selectLoggedInUser)
    const currentOrder = useSelector(selectCurrentOrder)
    const [selAddress, setSelAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const handleAddress = (e) => {
        console.log(e.target.value)
        setSelAddress(user.addresses[e.target.value])
        // console.log(selAddress)
    }
    const handlePaymentMethod = (e) => {
        // console.log(e.target.value)
        setPaymentMethod(e.target.value)
        console.log(paymentMethod)
    }
    const handleOrder = (e) => {
        const order = { cartItems, totalAmount, totalItems, user: user.id, paymentMethod, selAddress, status: "pending" }
        console.log(order)
        dispatch(addOrderAsync(order))

    }

    return (
        <>
            {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/ordersuccess/${currentOrder.id}`}></Navigate>}
            <Navbar />

            <div className="mx-auto my-6 max-w-7xl px-2 sm:px-6 lg:px-8 bg-white">

                <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-5">
                    {/* Left Form Section */}
                    <div className="lg:col-span-3">

                        <div className="space-y-4">
                            <form
                                noValidate
                                onSubmit={handleSubmit((address) => {
                                    // console.log(address)
                                    dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, address] }))
                                    reset()
                                })}
                            >
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 text-center">Checkout</h1>
                                {/* Personnel Detail Form */}
                                <div className="border-b border-gray-900/10 pb-6">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Shipping Address</h2>
                                    {/* Address Detail Form */}
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: "Name is required." })}
                                                    id="name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900">
                                                Contact
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register('contact', { required: "Name is required." })}
                                                    id="contact"
                                                    autoComplete="contact"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-full">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: "Email is required." })}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="house" className="block text-sm font-medium leading-6 text-gray-900">
                                                House / Apartment
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('house', { required: "house is required." })}
                                                    id="house"
                                                    autoComplete="house"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', { required: "Street is required." })}
                                                    id="street"
                                                    autoComplete="street"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: "City is required." })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('region', { required: "Region is required." })}
                                                    id="region"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    {...register('country', { required: "Country is required." })}
                                                    autoComplete="country-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>United States</option>
                                                    <option>India</option>
                                                    <option>Pakistan</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('postalCode', { required: "Postal Code is required." })}
                                                    id="postalCode"
                                                    autoComplete="postalCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Add address
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/* Addresses Stacks */}
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900 mt-3">Recent Addresses</h2>
                                <ul   >
                                    {user.addresses.map((address, index) => (
                                        <li key={index} className="flex justify-between gap-x-6 p-2 border-solid border-2 border-gray-300 rounded-lg mt-2">
                                            <div className="flex min-w-0 gap-x-4 items-center">
                                                <input
                                                    id="address"
                                                    type="radio"
                                                    name='address'
                                                    onChange={handleAddress}
                                                    value={index}
                                                    className=" h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.contact}</p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">
                                                    {`House/Apartment - ${address.house},${" "}
                                                            Street ${address.street},`}
                                                </p>
                                                <p className="text-sm leading-6 text-gray-900">
                                                    {`${address.city},${` `}\n
                                                            ${address.region},${" "}
                                                            ${address.country}.`}
                                                </p>
                                                <p className="text-sm leading-6 text-gray-500">
                                                    Postal Code - {address.postalCode}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Payment Mode Section */}
                            <div className="border-b border-gray-900/10 pb-4">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 text-center">Payment</h1>

                                <div>
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">Select Payment Method</legend>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="Card"
                                                    name="payment"
                                                    onChange={handlePaymentMethod}
                                                    value="card"
                                                    type="radio"
                                                    className=" h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Card" className=" block text-sm font-medium leading-6 text-gray-900">
                                                    Card
                                                </label>
                                            </div>
                                            <div className=" flex items-center gap-x-3">
                                                <input
                                                    id="Cash"
                                                    name="payment"
                                                    type="radio"
                                                    value="Cash"
                                                    onChange={handlePaymentMethod}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="Cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Cart Section */}
                    <div className="lg:col-span-2">
                        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 bg-white">

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-6 mb-1 text-center">Review Products</h1>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6">

                                <div className="flow-root">
                                    <ul className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((item) => (
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
                                                                Qty
                                                            </label>
                                                            <select onChange={(e) => handleQty(e, item)}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                onClick={e => handleRemove(e, item.id)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items Qty</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer">
                                        <button type='submit' onClick={handleOrder}>
                                            Order Now!
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <Link to='/'>
                                            <button
                                                onClick={handleOrder}
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500 mx-3"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CheckoutPage