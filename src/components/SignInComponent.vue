<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSubmit)">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Sign in</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <div class="text-left">
                    New user?
                    <router-link to="/signup">Create an account</router-link>
                  </div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      label="Email"
                      name="Email"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <v-text-field
                      v-model="password"
                      :error-messages="errors"
                      label="Password"
                      name="password"
                      type="password"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </ValidationObserver>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'
import { required, email, min } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

import { EventBus } from './Alert/BaseAlertComponent'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('min', {
  ...min,
  message: '{_field_} must contain at least {length} characters.'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  name: 'SignInComponent',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async onSubmit () {
      const formDataQuery = {
        query: `
          {
            login(email: "${this.email}", password: "${this.password}") {
              token
              userId
            }
          }
        `
      }

      try {
        const resp = await axios.post(
          `http://localhost:3000/graphql`,
          formDataQuery,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (resp.status === 200) {
          console.log('Login Success')
          this.$router.push("/home")
        }
      } catch (e) {
        console.log(e.response.data.errors)
        if (e.response.data.errors) {
          EventBus.$emit('errors_event', e.response.data.errors[0])
        }
      }
    }
  }
}
</script>

<style></style>
