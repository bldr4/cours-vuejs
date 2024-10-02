<template>
  <nav>
    <router-link to="/">Liste des utilisateurs</router-link> |
    <router-link to="/add-user">Ajouter un utilisateur</router-link>
  </nav>
  <router-view/>
  <footer>
    &copy; intro-composants - tous droits réservés
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
footer{
  margin-top:auto;
  background-color: #333;
  color:white;
  text-align: center;
  padding:10px;
  font-size:14px;
  position:fixed;
  bottom:0;
  left:0;
  right:0;
}
</style>
