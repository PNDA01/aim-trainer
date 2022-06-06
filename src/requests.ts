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

/**
 * It makes a GET request to the URL specified in the `usersUrl` variable, and returns the response as
 * a JSON object
 * @returns An array of users.
 */
export async function getUsers() {
  var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  const request = await fetch(usersUrl, requestOptions)
  const users = await request.json()
  return users
}

/**
 * It returns a user object if the username and password match, otherwise it returns undefined
 * @param {string} username - string, password: string
 * @param {string} password - string
 * @returns The user object that matches the username and password.
 */
export async function login(username: string, password: string) {
  const usersJson = await getUsers()
  return usersJson.find(
    (u: User) => u.password === password && u.username === username
  )
}

/**
 * It reads all users and returns the user with the given username
 * @param {string} username - string
 * @returns A Promise that resolves to a User object.
 */
export async function readByUsername(username: string) {
  const usersJson = await getUsers()
  return usersJson.find((u: User) => u.username === username)
}

/**
 * Signs user in.
 * It takes a name, username, and password, and returns a user object.
 * @param {string} name - string
 * @param {string} username - string
 * @param {string} password - string
 * @returns The user object
 */
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

/**
 * Adds a task for user with user_id
 * It takes a user_id, text, and status, and returns a task.
 * @param {number} user_id - number
 * @param {string} text - string
 * @param {boolean} status - boolean
 * @returns A promise.
 */
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

/**
 * It takes in a user_id, task_id, text, and status and updates the task with the given task_id for the
 * user with the given user_id.
 * @param {number} user_id - number - the id of the user
 * @param {number} task_id - number,
 * @param {string} text - string,
 * @param {boolean} status - boolean
 */
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

/**
 * It takes a user_id and returns a list of tasks
 * @param {number} user_id - number
 * @returns An array of tasks.
 */
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

/**
 * It takes a task id, and then it makes a DELETE request to the server, and then it waits for the
 * server to respond
 * @param {number} task_id - number
 */
export async function rm_task(task_id: number) {
  let url = `${todosUrl}/${task_id}`

  let requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow'
  }

  await fetch(url, requestOptions)
}
