import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, selectTotalItems, fetchProductByFilterAsync, selectAllCategories, selectAllBrands, fetchProductBrandsAsync } from '../../product/ProductSlice';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon, PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'

import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE, discountPrice } from '../../../app/constants';
import { fetchProductCategoriesAsync } from '../../product/ProductSlice';
import Pagination from '../../common/Pagination';

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminProductList() {

  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts)
  const totalItems = useSelector(selectTotalItems)
  const categories = useSelector(selectAllCategories)
  const brands = useSelector(selectAllBrands)
  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories
    },
    {
      id: 'brands',
      name: 'Brands',
      options: brands
    }
  ]

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState({})
  const [page, setPage] = useState(1)


  const handleFilter = (e, section, option) => {
    // console.log(section.id, option.value);
    // console.log(e.target.checked);
    const updatedFilters = { ...filter }
    // console.log(updatedFilters)
    if (e.target.checked) {
      if (updatedFilters[section.id]) {
        updatedFilters[section.id].push(option.value)
      } else {
        updatedFilters[section.id] = [option.value]
      }
    } else {
      const index = updatedFilters[section.id].findIndex(el => el === option.value)
      updatedFilters[section.id].splice(index, 1)
    }
    // console.log({ updatedFilters })
    setFilter(updatedFilters)
  }

  const handleSort = (e, option) => {
    const sortValue = { _sort: option.sort, _order: option.order }
    // console.log({ sortValue })
    setSort(sortValue)
  }

  const handlePage = (page) => {
    // console.log({ page })
    setPage(page)
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
    dispatch(fetchProductByFilterAsync({ filter, sort, pagination }))
  }, [dispatch, filter, sort, page])


  useEffect(() => {
    setPage(1)
  }, [totalItems, sort])

  useEffect(() => {
    dispatch(fetchProductCategoriesAsync())
    dispatch(fetchProductBrandsAsync())
  }, [dispatch])


  return (
    <div>
      <div className="bg-white">
        <div>
          {/* Mobile filter - Sort/view - dialog box */}
          <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter} filters={filters} />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 pt-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">All products</h1>
              {/* Mobile - Sidebar */}
              <MobileSideBar handleSort={handleSort} setMobileFiltersOpen={setMobileFiltersOpen} />
            </div>

            <section aria-labelledby="products-heading" className="pb-6 pt-3">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                {/* Filters */}
                <DekstopFilter handleSort={handleSort} handleFilter={handleFilter} filters={filters} />
                {/* Product List grid */}
                <div className="lg:col-span-4">
                  <ProductGrid products={products} />
                </div>
              </div>
            </section>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItems={totalItems} />
            </div>

          </main>

        </div>
      </div >
    </div >
  );
}

function MobileSideBar({ handleSort, setMobileFiltersOpen }) {
  return (
    <>
      <div className="flex items-center">
        <Link to="/admin/productform">
          <button type="button" className="-m-2 ml-5 p-2 group inline-flex justify-center text-sm font-medium  text-gray-700 hover:text-gray-900 sm:ml-7  gap-x-2 mr-2">
            <span>New Product</span>
            <PlusCircleIcon className="h-5 w-5 hover:text-amber-600" aria-hidden="true" />
          </button>
        </Link>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-violet-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <p
                        onClick={e => handleSort(e, option)}
                        className={classNames(
                          option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {option.name}
                      </p>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
          <span className="sr-only">View grid</span>
          <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}

function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, handleFilter, filters }) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">


                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={e => handleFilter(e, section, option)}

                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function DekstopFilter({ handleFilter, handleSort, filters }) {
  return (
    <form className="hidden lg:block">

      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={e => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  )
}

function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-2 sm:py-2 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative border-solid border-2 p-2 border-gray-100">
              <Link to={`/admin/productdetail/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className=''>
                    <h3 className="text-sm text-gray-700">{product.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className='w-6 h-6 inline'></StarIcon>
                      <span className='align-bottom'>{product.rating}</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{product.stock} items left only.</p>
                  </div>
                  <div className=''>
                    <p className="text-sm font-medium text-gray-900">$ {discountPrice(product)}</p>
                    <p className="text-xs font-medium text-gray-500 line-through">$ {product.price}</p>
                  </div>
                </div>
                {product.deleted &&
                  <div>
                    <p className='text-sm text-red-600'>Item deleted</p>
                  </div>
                }
              </Link>
              <Link to={`/admin/productform/edit/${product.id}`}>
                <button type="button" className="absolute right-1 -top-4 text-lime-800 hover:text-lime-900">
                  <PencilSquareIcon className="h-5 w-10" aria-hidden="true" />
                </button>
              </Link>
              {/* <button type="button" className="absolute right-6 -top-4 text-red-800 hover:text-red-900">
                <TrashIcon className="h-5 w-10" aria-hidden="true" />
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

