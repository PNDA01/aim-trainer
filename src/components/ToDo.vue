<script lang="ts">
import user from '../stores/user'
import * as Request from '../requests'

export default {
  name: 'ToDo',
  setup() {
    let task = ''
    let editedTask = -1
    let tasks: Request.Task[] = user.state.tasks
    const statuses = ['To Do', 'In Progress', 'Finished']

    function capitalizeFirstChar(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function changeStatus(index: number) {
      let newIndex = statuses.indexOf(tasks[index].status)
      if (++newIndex > 2) newIndex = 0
      tasks[index].status = statuses[newIndex]
    }
    function deleteTask(index: number) {
      tasks.splice(index, 1)
    }
    function editTask(index: number) {
      task = tasks[index].text
      editedTask = index
    }
    function onSubmit() {
      if (task.length === 0) return
      if (editedTask !== -1) {
        tasks[editedTask].text = task
        editedTask = -1
      } else {
        tasks.push({
          text: task,
          status: 'To Do'
        })
      }
    }

    return {
      task,
      tasks,
      statuses,
      capitalizeFirstChar,
      changeStatus,
      deleteTask,
      editTask,
      onSubmit
    }
  }
}
</script>

<template>
  <div class="todo-container">
    <h1 class="opacity">TO DO LIST</h1>
    <form class="todo" v-on:submit.prevent="onSubmit">
      <input type="text" v-model="task" placeholder="Enter task" />
      <button class="opacity" type="submit">SUBMIT</button>
    </form>

    <table class="todo">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col" style="width: 120px">Status</th>
          <th scope="col">#</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span>
              {{ task.text }}
            </span>
          </td>
          <td>
            <span class="pointer noselect" v-on:click="changeStatus(index)">
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td>
            <div v-on:click="deleteTask(index)">
              <img src="../assets/bin.png" />
            </div>
          </td>
          <td class="text-center">
            <div v-on:click="editTask(index)">
              <img src="../assets/pen.png" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
.line-through {
  text-decoration: line-through;
}
</style>
