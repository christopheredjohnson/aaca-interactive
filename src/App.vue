<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="/">Main</router-link>
      <router-link to="/search">Search</router-link>
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
  background: rgb(163,172,182);
  background: linear-gradient(0deg, rgba(163,172,182,1) 0%, rgba(174,180,189,1) 47%, rgba(218,220,223,1) 80%, rgba(244,244,244,1) 100%);
}

#nav {
  padding: 30px;
}

#nav a {
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  color: #a0abb4;
}

#nav a.router-link-exact-active {
  color: #fff;
}
</style>
