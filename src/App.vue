<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import navbar from './components/navBar'

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>
