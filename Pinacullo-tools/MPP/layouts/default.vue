<template>
  <div id="AllCode">
    <NavBar />
    <NuxtPage id="ContainerPrimary" />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
</script>

<style scoped>
#AllCode {
  display: flex;
  height: 100vh;
  width: 100%;
}
#ContainerPrimary {
  flex: 1;
  padding: 20px;
}
</style>
