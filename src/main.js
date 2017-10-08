// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import * as firebase from 'firebase'
import store from './store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCFTRYrNP4peQRDO8hsHvJKzkChcd4VnRk',
      authDomain: 'maia-3c299.firebaseapp.com',
      databaseURL: 'https://maia-3c299.firebaseio.com',
      projectId: 'maia-3c299',
      storageBucket: 'gs://maia-3c299.appspot.com',
      messagingSenderId: '183274042782'
    })
    // this.$store.dispatch('loadLocations')
    const userKey = Object.keys(window.localStorage)
    .filter(it => it.startsWith('firebase:authUser'))[0]
    const user = JSON.parse(localStorage.getItem(userKey))
    if (!userKey) {
      console.log('No key')
      this.$router.push('/login')
    } else {
      if (user.authDomain === 'maia-3c299.firebaseapp.com') {
        console.log(user.uid)
        const newUser = {
          id: user.uid,
          email: user.email
        }
        this.$store.dispatch('isAuth', newUser)
        this.$store.dispatch('loadLocations')
      } else {
        this.$router.push('/login')
      }
    }
  }
})
