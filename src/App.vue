<template>
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
        <v-toolbar-title class="shrink mt-1 hidden-sm-and-down"
          >{{ title  }}</v-toolbar-title
        >
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <ErrorAlert/>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import ErrorAlert from './components/Alert/ErrorAlertComponent'
// import {EventBus} from './components/Alert/BaseAlertComponent'

export default {
  name: 'App',
  data: () => ({
    title: process.env.VUE_APP_TITLE
  }),
  components: {
    ErrorAlert
  },
  created () {
    // EventBus.$on('errors_event', obj => {
    //   this.errors = true
    //   this.errorsArray = obj
    // })
  },
  methods: {

  },
  computed: {

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
