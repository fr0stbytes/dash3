<template>
  <div class="container">
    <b-row align-v="center" class="full-row">
        <b-col sm="10" md="6" lg="4" class="login-box">
          <div class="logo-box">
            <img src="../../static/logo-icon-blue.png" alt="">
          </div>
          <b-card header="Login"
                header-tag="header"
                header-bg-variant="primary"
                border-variant="primary"
                class="shadow-1 has-margin-5">
          <div class="loader" v-if="loader">
            <div class="span">
              <div class="typing_loader"></div>
            </div>
          </div>
          <b-alert :show="displayMessage" variant="danger" dismissible>{{this.message}}</b-alert>
          <b-alert :show="displaySuccess" variant="success" dismissible>You are now logged in. Redirecting...</b-alert>
          <b-form @submit.prevent="login" v-if="!loader">
            <b-form-group id="exampleInputGroup1"
                          label="Email:" label-for="exampleInput1" >
              <b-form-input id="exampleInput1" type="email" required
                            placeholder="me@example.com" class="form-control"
                            v-model="email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup1"
                          label="Password:" label-for="exampleInput1" >
              <b-form-input id="exampleInput1" type="password" required
                            placeholder="******" class="form-control"
                            v-model="password">
              </b-form-input>
            </b-form-group>
            <b-button variant="primary" class="has-margin-2" type="submit">Login</b-button>
          </b-form>
        </b-card>
        </b-col>
    </b-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      displayMessage: null,
      displaySuccess: null,
      loader: null
    }
  },
  methods: {
    login () {
      const loginData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', loginData)
      this.loader = true
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    message () {
      return this.$store.getters.getMessage
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        // this.$router.push('/dashboard')
        console.log('yay')
        this.displaySuccess = true
        setTimeout(() => {
          this.$router.push('/')
          this.loader = false
        }, 2000)
      }
    },
    message (value) {
      if (value !== null) {
        this.message = value
        this.displayMessage = true
        this.loader = false
      }
    }
  }
}
</script>

<style lang="scss">
  .full-row {
    height: 100vh;
  }
  .login-box {
    margin: 0 auto;
  }

  .span {
    width: 100px;
    height: 100px;
    vertical-align: middle;
    margin: 0 auto;
    // background-color: rgba(0, 0, 0, .3);
  }

  .typing_loader{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    -webkit-animation: typing 1s linear infinite alternate;
       -moz-animation: Typing 1s linear infinite alternate;
            animation: typing 1s linear infinite alternate;
    margin: 46px auto; /* Not necessary- its only for layouting*/
    position: relative;
    left: -25px;
    background-color: #3386ff;
  }
  @-webkit-keyframes typing{
    0%{
        background-color: rgba(51, 134, 255, 1);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,0.2),
                    50px 0px 0px 0px rgba(51, 134, 255,0.2);
      }
    25%{
        background-color: rgba(51, 134, 255, 0.4);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,2),
                    50px 0px 0px 0px rgba(51, 134, 255,0.2);
    }
    75%{ background-color: rgba(51, 134, 255, 0.4);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,0.2),
                    50px 0px 0px 0px rgba(51, 134, 255,1);
      }
  }

  @-moz-keyframes typing{
   0%{
        background-color: rgba(51, 134, 255, 1);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,0.2),
                    50px 0px 0px 0px rgba(255,255,255,0.2);
      }
    25%{
        background-color: rgba(51, 134, 255, 0.4);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,2),
                    50px 0px 0px 0px rgba(51, 134, 255,0.2);
    }
    75%{ background-color: rgba(51, 134, 255, 0.4);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,0.2),
                    50px 0px 0px 0px rgba(51, 134, 255,1);
      }
  }

  @keyframes typing{
   0%{
        background-color: rgba(51, 134, 255, 1);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,0.2),
                    50px 0px 0px 0px rgba(51, 134, 255,0.2);
      }
    25%{
        background-color: rgba(51, 134, 255, 0.4);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,2),
                    50px 0px 0px 0px rgba(51, 134, 255,0.2);
    }
    75%{ background-color: rgba(51, 134, 255, 0.4);
        box-shadow: 25px 0px 0px 0px rgba(51, 134, 255,0.2),
                    50px 0px 0px 0px rgba(51, 134, 255,1);
      }
}

</style>
