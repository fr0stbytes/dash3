import * as firebase from 'firebase'

// Initial state
const state = {
  user: null,
  message: ''
}

// getters
const getters = {
  getUser (state) {
    return state.user
  },
  getMessage (state) {
    return state.message
  }
}

// Actions
const actions = {
  login ({commit}, payload) {
    return firebase.database().ref('users').orderByChild('email').equalTo(payload.email).once('value')
    .then((data) => {
      const obj = data.val()
      for (let key in obj) {
        const role = obj[key].role
        // console.log(role)
        if (role === 'admin') {
          // console.log(role)
          return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            const newUser = {
              id: user.uid,
              email: user.email
            }
            // console.log(newUser)
            commit('setUser', newUser)
          })
        } else {
          commit('noAccess')
        }
      }
    })
  },
  register ({commit}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      const newUser = {
        id: user.uid,
        email: user.email,
        role: 'user',
        username: payload.username
      }
      firebase.database().ref('/users').push(newUser)
      commit('setUser', newUser)
    })
  },
  isAuth ({commit}, payload) {
    return firebase.database().ref('users').orderByChild('email').equalTo(payload.email).once('value')
    .then((data) => {
      const obj = data.val()
      for (let key in obj) {
        const role = obj[key].role
        // console.log(role)
        if (role === 'admin') {
          // console.log(role)
          // return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          const newUser = {
            id: payload.id,
            email: payload.email
          }
          // console.log(newUser)
          commit('setUser', newUser)
        } else {
          commit('noAccess')
        }
      }
    })
  },
  logout ({commit}) {
    return firebase.auth().signOut()
    .then(() => {
      commit('logout')
    })
  }
}

// Mutations
const mutations = {
  setUser (state, payload) {
    state.user = payload
    // console.log(payload)
    state.loading = false
  },
  noAccess (state) {
    state.message = 'You are not authorized to access dashboard. Sorry!'
  },
  logout (state) {
    state.user = ''
    // state.message = 'Thanks for visiting. Come back anytime <i class="fa fa-heart" aria-hidden="true"></i>'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
