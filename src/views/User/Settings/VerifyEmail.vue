<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <!-- <ValidationObserver ref="observer" v-slot="{ handleSubmit }"> -->

            <div color="primary" class="primary rounded-t-lg pa-1"></div>
            <v-card-text class="text-center">
              <h2 class="my-6">Please verify your email</h2>
              <p class="my-6">
                You're almost there! We sent an email to
                <strong>{{ email }}</strong>
              </p>

              <p class="mb-6">
                Just click on the link in that email to complete your signup. If
                you don't see it, you may need to
                <strong>check your spam</strong> folder.
              </p>

              <p class="mb-6">Still can't find the email?</p>

              <v-btn class="text-center" color="primary" type="submit" @click="onSubmit()"
                >Resend Email</v-btn
              >

              <p class="my-6">Need help? <a href="#">Contact Us</a></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'VerifyEmail',
  components: {},
  data: () => ({
    email: localStorage.getItem('tempUser')
  }),
  created () {},
  methods: {
    ...mapActions('account', ['verify']),
    async onSubmit () {
      const { email } = this
      // var username = this.username,
      //     password = this.password
      console.log(email)

      await this.verify({ email })
    }
  },
  computed: {
    ...mapState('account', ['status'])
  }
}
</script>

<style></style>
