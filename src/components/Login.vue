<script lang="ts">
import user from '../stores/user'
import router from '../router'

export default {
  setup() {
    const onSubmit = async () => {
      await user.dispatch('login', user)
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
        <h1 class="opacity">LOGIN</h1>
        <h4 class="opacity">{{ user.state.status }}</h4>
        <form v-on:submit.prevent="onSubmit">
          <input type="text" placeholder="USERNAME" v-model="user.username" />
          <input
            type="password"
            placeholder="PASSWORD"
            v-model="user.password"
          />
          <button class="opacity" type="submit">SUBMIT</button>
        </form>
        <div class="register-forget opacity">
          <div>
            <text>Don't have an account yet?</text>
            <br />
            <router-link to="/signin">SIGN IN</router-link>
          </div>
        </div>
      </div>
      <div class="circle circle-two"></div>
    </div>
  </section>
</template>
