<script lang="ts">
import { defineComponent } from 'vue'
import user from '../stores/user'

export default defineComponent({
  name: 'ToDo',
  data() {
    return {
      tasks: user.state.tasks,
      task: '',
      editIndex: -1
    }
  },
  methods: {
    addTask: async function () {
      if (this.task !== '') {
        await user.dispatch('add_task', this.task)
        this.task = ''
      }
    },

    updateStatus: async function (e: any) {
      let newStatus =
        e.currentTarget.parentElement.getAttribute('data-status') == 'true'
          ? false
          : true
      let newTask = {
        id: e.currentTarget.getAttribute('data-id'),
        text: e.currentTarget.getAttribute('data-text'),
        status: newStatus
      }
      await user.dispatch('update_task', newTask)
    },
    updateText: async function (e: any) {
      if (this.editIndex === -1) {
        this.editIndex = e.currentTarget.getAttribute('data-ind')
      } else {
        let newTask = {
          id: e.currentTarget.getAttribute('data-id'),
          text: this.tasks[this.editIndex].text,
          status: e.currentTarget.getAttribute('data-status')
        }
        await user.dispatch('update_task', newTask)
        this.editIndex = -1
      }
    },

    rmTask: async function (e: any) {
      const task_id = e.currentTarget.getAttribute('data-id')
      await user.dispatch('rm_task', task_id)
    }
  }
})
</script>

<template>
  <div class="todo-container">
    <h1 class="opacity">TO DO LIST</h1>
    <form class="todo" v-on:submit.prevent="addTask">
      <input type="text" v-model="task" placeholder="Enter task" />
      <button class="opacity" type="submit">ADD TASK</button>
    </form>
    <div class="todo" v-for="(t, index) in tasks" :key="t.id">
      <div class="list-item-holder" :data-status="t.status">
        <div class="checkbox-items" :data-status="t.status">
          <input
            type="checkbox"
            :data-id="t.id"
            :data-text="t.text"
            v-model="t.status"
            v-on:click="updateStatus"
          />
          <input
            v-if="editIndex == index"
            class="edit-input"
            type="text"
            v-model="t.text"
            placeholder="Enter task"
          />
          <label v-else>{{ t.text }}</label>
        </div>
        <div class="button-container">
          <div
            class="item"
            :data-ind="index"
            :data-id="t.id"
            :data-text="t.text"
            :data-status="t.status"
            v-on:click="updateText"
          >
            {{ editIndex == index ? 'Save' : 'Modify' }}
          </div>
          <div class="item" :data-id="t.id" v-on:click="rmTask">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-item-holder {
  display: flex;
  padding: 1rem 1rem;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.button-container {
  display: flex;
  flex-direction: row;
}
.item {
  flex: 1;
  font-size: 0.875rem;
  margin: 0 0 0 0.5rem;
  border-radius: 100px;
  transition: all 0.1s ease-out;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
}
.checkbox-items {
  display: flex;
  align-items: center;
}
.item:hover {
  background: var(--color);
}
[data-status='false'] label {
  color: var(--color);
  font-weight: 600;
}
[data-status='true'] label {
  text-decoration: line-through;
}
</style>
