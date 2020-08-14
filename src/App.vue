<template>
<!-- 
 TODO
 Add Email Confirmation 
 Add Forgot Password and Forgot Email components
 Add Email and Fullname to global state
 -->
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.png')"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title class="shrink mt-1 hidden-sm-and-down">{{
          title
        }}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="account.user">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
            {{ account.user.email }}
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list nav>
          <v-list-item @click="test">
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="test">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="this.logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <ErrorAlert />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ErrorAlert from './components/Alert/ErrorAlertComponent'

export default {
  name: 'App',
  data: () => ({
    title: process.env.VUE_APP_TITLE
  }),
  components: {
    ErrorAlert
  },
  mounted () {
    this.setLogoutTimer()
  },
  methods: {
    ...mapActions('account', ['logout', 'setLogoutTimer']),
    test () {}
  },
  computed: {
    ...mapState(['account'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
