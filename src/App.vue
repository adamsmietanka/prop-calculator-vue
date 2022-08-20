<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  color: #2c3e50;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(245, 245, 245);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(230, 230, 230);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(220, 220, 220);
}
</style>
<script>
import Navigation from "./components/layout/Navigation.vue";

export default {
  name: "app",
  components: {
    Navigation,
  },
};
</script>
