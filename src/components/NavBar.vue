<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color: rgb(20,20,20);">
      <b-navbar-brand href="#">FrozenLens.Org</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="#">About</b-nav-item>
          <b-nav-item to="#">Gallery</b-nav-item>
          <b-nav-item to="#">Resume</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="this.$store.getters.user !== undefined">
            <template
              slot="button-content"
            >{{ this.$store.getters.user.attributes.given_name }} {{ this.$store.getters.user.attributes.family_name }}</template>
            <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else right to="/login">Sign In</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  data() {
    return {
      logger: undefined
    };
  },
  async mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name);
  },
  methods: {
    signout() {
      this.$Amplify.Auth.signOut()
        .then(() => {
          this.logger.info("signout success");
          return AmplifyEventBus.$emit("authState", "signedOut");
        })
        .catch(e => this.setError(e));
    },
    setError(e) {
      let error = this.$Amplify.I18n.get(e.message || e);
      this.logger.error(error);
    }
  }
};
</script>

<style>
</style>
