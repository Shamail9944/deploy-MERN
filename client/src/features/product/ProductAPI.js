export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/product/allProducts')
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/product/ProductById/' + id)
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchProductByFilter(filter, sort, pagination) {

  let queryString = ''

  for (let key in filter) {
    const categoryValues = filter[key]
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/product/productByFilters?' + queryString)
    const data = await response.json()
    const totalItems = response.headers.get("Total-Results")
    resolve({ data: { products: data, totalItems: +totalItems } })
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/category/fetchCategories')
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/brands/fetchBrands')
    const data = await response.json()
    resolve({ data })
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/product/addNewProduct/', {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
    })
    const data = await response.json()
    resolve({ data })
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/product/updateProduct/' + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
    })
    const data = await response.json()
    resolve({ data })
  });
}