<template>
  <div id="topcontainer">
    <NavBar/>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on("authState", () => {
      this.findUser();
    });
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.$store.commit("user", user);
      } catch (err) {
        this.$store.commit("user", undefined);
      }
    }
  }
};
</script>


<style>
@import url(https://fonts.googleapis.com/css?family=Courgette&display=swap);

html {
  width: 100%;
  height: 100%;
  margin: 0;
}
body {
  background-image: url(./assets/background.jpg);
  background-size: cover;
  background-position: center left;
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Courgette, sans !important;
}
#topcontainer {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-flow: column;
  overflow: none;
}
#app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
