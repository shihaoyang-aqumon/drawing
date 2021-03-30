<template>
  <div id="app">
    <span class="lang" @click="changeLang('en')">en</span>&nbsp<span class="lang" @click="changeLang('cn')">cn</span>
    <div id="nav">
      <router-link to="/echarts">Echarts</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    changeLang(lang) {
      localStorage.setItem("language", lang);
      location.reload();
    }
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .lang {
    padding: 5px 20px;
    background-color: #ccc;
    border-radius: 5px;
    box-shadow: 5px 5px 8px #aaa;
    cursor: pointer;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
