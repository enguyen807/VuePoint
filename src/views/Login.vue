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
                    <router-link to="/register">Create an account</router-link>
                  </div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      aria-autocomplete="email"
                      :error-messages="errors"
                      :aria-describedby="errors"
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
                      :aria-describedby="errors"
                      label="Password"
                      name="current-password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </ValidationProvider>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary" to="/verify-email">Forgot password?</v-btn>
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
import { mapState, mapActions } from 'vuex'
import { required, email, min } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

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
    password: '',
    showPassword: ''
  }),
  created () {
    this.logout()
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    async onSubmit () {
      const { email, password } = this
      // var username = this.username,
      //     password = this.password

      await this.login({ email, password })
    }
  },
  computed: {
    ...mapState('account', ['status'])
  }
}
</script>

<style></style>
