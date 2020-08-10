<template>
  <header class="header">
    <div id="nav">
      <router-link to="/">
        <h2>Prop Calculator</h2>
      </router-link>
      <router-link to="/engine">Engine</router-link>
      <router-link to="/results">Results</router-link>
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

  h2 {
    display: inline;
  }
</style>
