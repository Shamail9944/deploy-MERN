export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-frontend-sable.vercel.app')
    const data = await response.json()
    resolve({ data })
  });
}
