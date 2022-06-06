export type User = {
  id: number
  name: string
  username: string
  password: string
  tasks: Task[]
}

export type Task = {
  text: string
  status: string
}
export type UserList = Array<User>

const baseUrl = 'http://localhost:8080/api/users'

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
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    name: name,
    username: username,
    password: password
  })

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  const request = await fetch(baseUrl, requestOptions)
  const user = await request.json()
  return user
}

export async function addtask(user_id: number, text: string, status: string) {
  let url = `${baseUrl}/${user_id}/todos`

  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    text: text,
    status: status
  })

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  await fetch(url, requestOptions)
}

export async function gettasks(user_id: number) {
  let url = `${baseUrl}/${user_id}/todos`

  let requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  const request = await fetch(url, requestOptions)
  const tasks: Task[] = await request.json()
  return tasks
}
