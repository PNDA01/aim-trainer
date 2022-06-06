export type User = {
  id: number
  name: string
  username: string
  password: string
  tasks: Task[]
}

export type Task = {
  id: number
  text: string
  status: boolean
}
export type UserList = Array<User>

const usersUrl = 'http://localhost:8080/api/users'
const todosUrl = 'http://localhost:8080/api/todos'

export async function getUsers() {
  var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  const request = await fetch(usersUrl, requestOptions)
  const users = await request.json()
  return users
}

export async function login(username: string, password: string) {
  const usersJson = await getUsers()
  return usersJson.find(
    (u: User) => u.password === password && u.username === username
  )
}

export async function readByUsername(username: string) {
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

  const request = await fetch(usersUrl, requestOptions)
  const user = await request.json()
  return user
}

export async function add_task(user_id: number, text: string, status: boolean) {
  let url = `${usersUrl}/${user_id}/todos`

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

  const request = await fetch(url, requestOptions)
  const task = request.json()
  return task
}

export async function update_task(
  user_id: number,
  task_id: number,
  text: string,
  status: boolean
) {
  let url = `${usersUrl}/${user_id}/todos`

  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    id: task_id,
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

export async function get_tasks(user_id: number) {
  let url = `${usersUrl}/${user_id}/todos`

  let requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  const request = await fetch(url, requestOptions)
  const tasks: Task[] = await request.json()
  return tasks
}

export async function rm_task(task_id: number) {
  let url = `${todosUrl}/${task_id}`

  let requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow'
  }

  await fetch(url, requestOptions)
}
