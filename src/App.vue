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
</style>
<script>
import Navigation from './components/layout/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation,
  },
};
</script>
