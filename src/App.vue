<template>
<div id="app">
  <Header/>
  <router-view/>
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
import Header from './components/layout/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  created() {
    document.title = 'Prop Calculator';
  },
};
</script>
