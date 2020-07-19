<template>
  <v-alert
    v-show="errors"
    dismissible
    close-icon="mdi-delete"
    border="left"
    elevation="2"
    colored-border
    type="error"
    transition="scale-transition"
  >
  {{ errorsArray.message }}
  </v-alert>
</template>

<script>
export default {
  props: {
    errors: Boolean,
    errorsArray: Array
  },
  data: () => ({}),
}
</script>

<style></style>
