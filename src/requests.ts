export type User = { name: string; username: string; password: string }
export type UserList = Array<User>

const baseUrl = 'http://localhost:8080/rest/users'

export async function getUsers() {
  var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  const request = await fetch(baseUrl, requestOptions)
  const users = await request.json()
  return users
}

export async function login(username: string, password: string) {
  const usersJson = await getUsers()
  return usersJson.find(
    (u: User) => u.password === password && u.username === username
  )
}

export async function exists(username: string) {
  const usersJson = await getUsers()
  return usersJson.find((u: User) => u.username === username)
}

export async function signin(name: string, username: string, password: string) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  var urlencoded = new URLSearchParams()
  urlencoded.append('name', name)
  urlencoded.append('username', username)
  urlencoded.append('password', password)

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  }

  await fetch(baseUrl, requestOptions)
}
