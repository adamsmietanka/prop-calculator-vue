<template>
  <aside :class="{ hidden: !toggled }">
    <div class="toggler">
        <i
          class="fas"
          v-on:click="toggled = !toggled"
          :class="{ 'fa-bars': !toggled, 'fa-times': toggled }"
        />
      </div>
    <nav>
      <router-link to="/" @click.native="hideMobileMenu">
        <i class="fas fa-plane" />
        <span>Prop Calculator</span>
      </router-link>
      <router-link to="/engine" @click.native="hideMobileMenu">
        <i class="fas fa-cogs" />
        <span>Engine</span>
      </router-link>
      <router-link to="/propeller" @click.native="hideMobileMenu">
        <i class="fas fa-fan" />
        <span>Propeller</span>
      </router-link>
      <router-link to="/results" @click.native="hideMobileMenu">
        <i class="fas fa-calculator" />
        <span>Results</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    hideMobileMenu() {
      this.toggled = false;
    },
  },
};
</script>

<style scoped>
.toggler {
  display: none;
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 5rem;
  background: #333;
  color: white;
  display: flex;
  flex-direction: column;
  transition: all 0.25s;
  z-index: 100;
}

nav {
  overflow: hidden;
}

aside:hover {
  width: 15rem;
}

a {
  display: grid;
  grid-template-columns: 5rem max-content;
  justify-items: center;
  align-items: center;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: white;
  font-size: 1.75rem;
  color: #eee;
}

a:first-of-type {
  font-size: 2.25rem;
  margin-top: 1rem;
}

a.router-link-exact-active {
  color: #42b983;
}
span {
  font-weight: 700;
  font-size: 1.25rem;
}

@media screen and (max-width: 960px) {
  aside {
    width: 15rem;
  }
  .hidden {
    left: -15rem;
  }
  header {
    display: block;
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 15rem;
    width: 4rem;
    height: 4rem;
    border-radius: 0 0rem 2.5rem 0rem;
    opacity: 0.8;
    font-size: 1.5rem;
    cursor: pointer;
    color: black;
    background-color: #ddd;
  }
}
</style>
