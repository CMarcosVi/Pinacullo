<template>
  <nav class="navbar">
    <ul>
      <li><NuxtLink to="/deashboard">Dashboard</NuxtLink></li>
      <li><NuxtLink to="/projetos">Projetos</NuxtLink></li>
      <li><NuxtLink to="/clientes">Clientes</NuxtLink></li>
      <li><NuxtLink to="/tarefas">Tarefas</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  width: 200px;
  background-color: #222;
  color: #fff;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
