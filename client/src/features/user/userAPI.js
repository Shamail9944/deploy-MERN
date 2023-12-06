export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-frontend-sable.vercel.app/order/orderByUserId?userId=' + userId)
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-frontend-sable.vercel.app/user/fetchUserById/' + userId)
    const data = await response.json()
    resolve({ data })
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-frontend-sable.vercel.app/user/updateUser/' + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()
    resolve({ data })
  });
} 