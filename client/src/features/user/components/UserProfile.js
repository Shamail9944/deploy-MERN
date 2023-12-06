import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

const UserProfile = () => {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm()
  const [editAddressIndex, seteditAddressIndex] = useState(-1)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)

  const handleEdit = (updatedAddressData, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1, updatedAddressData)
    dispatch(updateUserAsync(newUser))
    seteditAddressIndex(-1)
  }

  const handleEditForm = (index) => {
    seteditAddressIndex(index)
    const address = user.addresses[index]
    setValue("name", address.name)
    setValue("contact", address.contact)
    setValue("email", address.email)
    setValue("house", address.house)
    setValue("street", address.street)
    setValue("city", address.city)
    setValue("region", address.region)
    setValue("country", address.country)
    setValue("postalCode", address.postalCode)
  }

  const handleDelete = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleAdd = (addresses) => {
    const newUser = { ...user, addresses: [...user.addresses, addresses] }
    dispatch(updateUserAsync(newUser))
    setShowAddAddressForm(false)
  }

  return (
    <div className="m-4 pb-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">

      {/* Name or Email */}
      <div className="sm:col-span-full px-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 text-center">My Profile</h1>
        <h1 className="text-2xl block mb-4 leading-6 text-gray-900">
          Name: {user.name ? user.name : "Guest - " + user.id}
        </h1>
        {user.role === 'admin' &&
          <h2 className="block text-2xl mb-4  leading-6 text-gray-900">
            Role - {user.role}
          </h2>
        }
        <h2 className="block text-sm font-medium leading-6 text-gray-900">
          Email Address - {user.email}
        </h2>
      </div>

      <div className="sm:col-span-full px-12">
        <div className=' mt-3 flex justify-between align-middle'>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Your Addresses</h2>
          <button
            type="button"
            className="font-medium text-green-600 hover:text-green-900 mx-2"
            onClick={e => { setShowAddAddressForm(true); seteditAddressIndex(-1) }}
          >
            Add New Address
          </button>
        </div>


        {/* Add Address Form */}
        <div>
          {showAddAddressForm &&
            <form noValidate
              onSubmit=
              {
                handleSubmit((data) => {
                  console.log("Form data submitted", data)
                  handleAdd(data)
                  reset()
                })
              }
            >
              {/* Personnel Detail Form */}
              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="mt-4 text-base font-semibold leading-7 text-gray-900">Edit your Address</h2>
                {/* Address Detail Form */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">

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

                  <div className="sm:col-span-full flex ms-auto">
                    <button
                      type="submit"
                      onClick={e => seteditAddressIndex(-1)}
                      className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={e => handleSubmit()}
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Update Address
                    </button>
                  </div>
                </div>
              </div>
            </form>}
        </div>


        <ul   >
          {user.addresses.map((address, index) => (
            <div key={index}>

              {/* Your Addresses Stacks */}
              <div>
                <li key={index} className="flex justify-between gap-x-6 p-2 border-solid border-2 border-gray-300 rounded-lg mt-2">
                  <div className="flex min-w-0 gap-x-4 items-center">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.contact}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {`House/Apartment - ${address.house},${" "}Street ${address.street},`}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {`${address.city},${` `}\n${address.region},${" "}${address.country}.`}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      Postal Code - {address.postalCode}
                    </p>
                    <div className='flex'>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 mx-2"
                        onClick={() => handleEditForm(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 mx-2"
                        onClick={e => handleDelete(e, index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              </div>

              {/* Form for Edit Address */}
              <div>
                {editAddressIndex === index ?
                  <form noValidate
                    onSubmit=
                    {
                      handleSubmit((data) => {
                        console.log("Form data submitted", data)
                        handleEdit(data, index)
                        reset()
                      })
                    }
                  >
                    {/* Personnel Detail Form */}
                    <div className="border-b border-gray-900/10 pb-6">
                      <h2 className="mt-4 text-base font-semibold leading-7 text-gray-900">Edit your Address</h2>
                      {/* Address Detail Form */}
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 ">

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

                        <div className="sm:col-span-full flex ms-auto">
                          <button
                            type="submit"
                            onClick={e => seteditAddressIndex(-1)}
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Update Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </form> : null}
              </div>

            </div>
          ))}
        </ul>


      </div>

    </div>
  )
}

export default UserProfile