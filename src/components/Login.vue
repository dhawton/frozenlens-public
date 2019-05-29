<template>
  <div>
    <amplify-authenticator v-if="!signedIn" v-bind:authConfig="signupconfig"></amplify-authenticator>
    <amplify-sign-out v-if="signedIn"></amplify-sign-out>
  </div>
</template>

<script>
import { components, AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";

export default {
  name,
  components: {
    ...components
  },
  computed: {
    signedIn() {
      if (this.$store.getters.user === undefined) return false;

      return true;
    }
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on("authState", () => {
      this.findUser();
    });
  },
  data() {
    return {
      signupconfig: {
        signInConfig: {
          isSignUpDisplayed: false
        }
      }
    };
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.$store.commit("user", user);
        this.$router.push({ path: "/" });
      } catch (err) {
        this.$store.commit("user", undefined);
      }
    }
  }
};
</script>

<style>
</style>
