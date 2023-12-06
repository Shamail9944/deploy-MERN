export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app')
    const data = await response.json()
    resolve({ data })
  });
}
