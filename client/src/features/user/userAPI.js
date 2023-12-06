export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/order/orderByUserId?userId=' + userId)
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/fetchUserById/' + userId)
    const data = await response.json()
    resolve({ data })
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/updateUser/' + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()
    resolve({ data })
  });
} 