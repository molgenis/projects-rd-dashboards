<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <ul class="nav">
      <li>
        <router-link :to="{name: 'home'}">Home</router-link>
      </li>
    </ul>
  </nav>
  <RouterView />
</template>

<!-- <style lang="scss">
.geo-mercator-tooltip {

  h3 {
    position: relative;
    margin: 0;
    margin-bottom: 4px;
    display: flex;
    flex-direction: flex-start;
    align-items: center;
    column-gap: 12px;
    
    .bubble {
      display: block;
      background-color: $blue-800;
      font-size: 11pt;
      font-weight: bold;
      box-sizing: border-box;
      padding: 4px 12px;
      border-radius: 24px;
      color: $blue-050;
      
      &.bubble-active {
        background-color: hsl(120, 61%, 80%);
        color: hsl(120, 61%, 20%);
      }
      
      &.bubble-inactive {
        background-color: hsl(350, 100%, 88%);
        color: hsl(350, 100%, 28%);
      }
    }
  }
}
</style> -->

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.app-page, .navbar {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14pt;
}
.navbar {
  background-color: $green-700;
  box-sizing: content-box;
  padding: 1em;
  
  .nav {
    padding: 0;
    margin: 0;
    list-style: none;
    
    li {
      a {
        color: $green-050;
      }
    }
  }
}
</style>