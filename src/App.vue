<template>
  <div id="app">
    <div class="app-header">
      <span class="broughtby">brought to you by: <span class="broughtby-name">Steve Moskowitz</span></span>
    </div>

    <router-view class="app-content" />

    <div class="app-footer">
      <div>
        <img src="@/assets/Logo.png"/>
      </div>
      <div>
        <router-link to="/">Main</router-link>
        <router-link to="/search">Search</router-link>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }

  #app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
    'header'
    'content'
    'footer';
    background: rgb(163,172,182);
    background: linear-gradient(0deg, rgba(163,172,182,1) 0%, rgba(174,180,189,1) 47%, rgba(218,220,223,1) 80%, rgba(244,244,244,1) 100%);
  }

  .app-footer,
  .app-header {
    background-color: #0E3E4E;
  }
  .app-header {
    min-height: 50px;
    display: grid;
    grid-area: 'header';
    place-items: center;

    .broughtby {
      color: #A5ADB6;
      font-size: 20px;
      text-transform: uppercase;
      &-name {
        color: #fff;
        font-size: 50px;
      }
    }
  }

  .app-content {
    display: grid;
    place-items: center ;
    grid-area: content;
  }

  .app-footer {
    grid-area: footer;
    a {
      font-size: 20px;
      text-decoration: none;
      text-transform: uppercase;
      color: #A5ADB6;
      &.router-link-active.router-link-exact-active {
        color: #FFFFFF;
        border-bottom: 2px solid #EF4823;
      }
    }
  }
</style>