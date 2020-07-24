<template>
  <v-alert
    v-if="alert.message"
    dismissible
    close-icon="mdi-delete"
    border="left"
    elevation="2"
    colored-border
    :type="`${alert.type}`"
    transition="scale-transition"
  >
    {{ alert.message }} 
  </v-alert>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  },
  watch: {
    $route () {
      this.clearAlert()
    }
  }
}
</script>

<style></style>
