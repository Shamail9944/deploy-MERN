export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/order/orderByUserId?userId=' + userId)
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/user/fetchUserById/' + userId)
    const data = await response.json()
    resolve({ data })
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/user/updateUser/' + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
    })
    const data = await response.json()
    resolve({ data })
  });
} 