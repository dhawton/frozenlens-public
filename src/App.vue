<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
  background-position: top left;
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Courgette, sans;
}
#app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
