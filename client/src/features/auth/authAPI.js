
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/auth/createUser', {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://deploy-mern-server-po2f8lyo0-shamail9944.vercel.app/auth/checkUser', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
      })

      if (response.ok) {
        const data = await response.json()
        resolve({ data })
        // console.log(data)
      } else {
        const error = await response.json()
        reject(error)

      }
    } catch (error) {
      reject(error)
    }
  });
}

export function signout(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "signout success" })
  });
}

