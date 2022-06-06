<script lang="ts">
import { defineComponent } from 'vue'
import user from '../stores/user'
import router from '../router'

export default {
  setup() {
    const onSubmit = async () => {
      await user.dispatch('login', user.state)
      if (user.state.status === 'Success') {
        router.push('/todo')
      }
    }
    return { user, onSubmit }
  }
}
</script>

<template>
  <section class="container">
    <div class="log-sign-container">
      <div class="circle circle-one"></div>
      <div class="sub-container">
        <img
          src="../assets/illustration.png"
          alt="illustration"
          class="illustration"
        />
        <h1 class="opacity">SIGN IN</h1>
        <h4 class="opacity">{{ user.state.status }}</h4>
        <form v-on:submit.prevent="onSubmit">
          <input type="text" placeholder="NAME" v-model="user.state.name" />
          <input
            type="text"
            placeholder="USERNAME"
            v-model="user.state.username"
          />
          <input
            type="password"
            placeholder="PASSWORD"
            v-model="user.state.password"
          />
          <button class="opacity" type="submit">SUBMIT</button>
        </form>
        <div class="register-forget opacity">
          <div>
            <text>Already have an account?</text>
            <br />
            <router-link to="/login">LOGIN</router-link>
          </div>
        </div>
      </div>
      <div class="circle circle-two"></div>
    </div>
  </section>
</template>
