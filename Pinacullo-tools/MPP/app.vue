<template>
  <section id="AllCode">
    <NuxtRouteAnnouncer />
    <NavBar />
    <NuxtPage id="ContainerPrimary"/>
  </section>
</template>

<script setup>
  import NavBar from './src/components/NavBar.vue';
</script>

<style>
*{
  margin:0 !important;
  padding:0 !important;
  box-sizing: border-box;
}
body{
  height: 100vh;
  width: 100%;
}
#__nuxt{
  height: 100%;
  width: 100%;
}
#AllCode{
  display: flex;
  width: 100%;
  height: 100%;
}
#ContainerPrimary{
  width: 80%;
}
</style>