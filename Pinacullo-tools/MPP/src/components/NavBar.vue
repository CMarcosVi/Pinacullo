<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/about">Sobre</NuxtLink></li>
      <li><NuxtLink to="/contato">Contato</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #111;
  padding: 1rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
