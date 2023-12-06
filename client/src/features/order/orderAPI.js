export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/order/addOrder', {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
    })
    const data = await response.json()
    resolve({ data })
  });
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/orders/' + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
    })
    const data = await response.json()
    resolve({ data })
  });
}
export function FetchAllOrders(pagination) {
  let queryString = ''
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/orders?' + queryString)
    const data = await response.json()
    const totalOrders = await response.headers.get("X-Total-Count")
    resolve({ data: { orders: data, totalOrders: +totalOrders } })
  });
}