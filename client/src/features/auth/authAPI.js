
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/auth/createUser', {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/checkUser', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "content-type": "application/json" }
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

