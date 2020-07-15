<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Create an account</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <div class="text-left">
                Already have an account?
                <router-link to="/signin">Sign in</router-link>
              </div>
              <v-form>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  name="email"
                  type="text"
                ></v-text-field>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="firstname"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                ></v-text-field>

                <v-select
                  v-model="country"
                  :items="items"
                  :rules="[v => !!v || 'Country/Region field is required']"
                  label="Country/Region"
                  required
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Create account</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'LoginComponent',
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6)
    ],
    firstName: '',
    lastName: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    country: 'Estonia',
    items: ['United States', 'Estonia', 'Canada']
  }),
  computed: {
    fullName () {
      return this.firstName + ' ' + this.lastName
    }
  }
}
</script>

<style></style>
