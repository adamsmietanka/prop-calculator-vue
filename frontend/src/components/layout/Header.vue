<template>
  <header class="header">
    <div id="nav">
      <router-link to="/">
        <h1>Propeller Calculator</h1>
      </router-link>
      <router-link to="/engine">Engine</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
  .header {
    background: #333;
    color: #eee;
    padding: 10px;
  }

  .header a {
    color: #eee;
    padding-right: 15px;
    text-decoration: none;
  }

  .header a.router-link-exact-active {
    color: #42b983;
  }

  h1 {
    display: inline;
  }
</style>
