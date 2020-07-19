<template>
  <v-text-field :name="name" :label="name" :value="value" @input.native="$emit('input', $event.target.value)">
  </v-text-field>
</template>

<script>
export default {
  props: ['name', 'value']
}
</script>

<style>

</style>