import Vue from 'vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

export const themes = [
  {
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  },
  {
    background: '#461220',
    color: '#FFFFFF',
    primaryColor: '#E94560'
  },
  {
    background: '#192A51',
    color: '#FFFFFF',
    primaryColor: '#967AA1'
  },
  {
    background: '#F7B267',
    color: '#000000',
    primaryColor: '#F4845F'
  },
  {
    background: '#F25F5C',
    color: '#000000',
    primaryColor: '#642B36'
  },
  {
    background: '#231F20',
    color: '#FFFFFF',
    primaryColor: '#BB4430'
  }
]

const setTheme = (theme: any) => {
  const root: any = document.querySelector(':root')
  root.style.setProperty('--background', theme.background)
  root.style.setProperty('--color', theme.color)
  root.style.setProperty('--primary-color', theme.primaryColor)
}

const displayThemeButtons = () => {
  const btnContainer = document.querySelector('.theme-btn-container')
  themes.forEach((theme) => {
    const div = document.createElement('div')
    div.className = 'theme-btn'
    div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`
    btnContainer!.appendChild(div)
    div.addEventListener('click', () => setTheme(theme))
  })
}

displayThemeButtons()
