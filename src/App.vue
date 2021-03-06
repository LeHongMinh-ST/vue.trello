<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapMutations('auth', ['updateLoginStatus','updateAuthUser']),
    async handleLogout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('vuex')
      this.updateLoginStatus({
        isAuthenticated: false,
      })

      this.updateAuthUser({
        authUser: {},
      })
      if (this.$router.currentRoute.name !== 'Login') {
        await this.$router.push({ name: 'Login' })
      }
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'http://vuecourse.zent.edu.vn/api/auth/me',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then((response) => {
      this.updateLoginStatus({
        isAuthenticated: true,
      })

      this.updateAuthUser({
        authUser:  response.data,
      })
    }).catch((error) => {
      if (error.response.status === 401) {
        this.updateLoginStatus({
          isAuthenticated: false,
        })

        this.updateAuthUser({
          authUser: {},
        })
        localStorage.removeItem('access_token')
        if (this.$router.currentRoute.name !== 'Login') {
          this.$router.push({ name: 'Login' })
        }
      }
    })
  }
}
</script>
<style lang="scss">
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}

body, button, html, input, select, textarea {
  color: #172b4d;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
