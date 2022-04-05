<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/info">Info</router-link> |
      <router-link to="/cart">Cart</router-link> 
    </nav>
    <div class="botonera">
      <p v-if="usuarioActivo != 'Anonimo'">Bienvenido/a {{usuarioActivo}}</p>
      <p v-else>Aún no estás logueado/a</p>
      <v-btn v-if="usuarioActivo != 'Anonimo'" @click="realizarLogout()">Logout</v-btn>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    //en computed los estados
  computed:{
    ...mapState([
      'usuarioActivo'
    ])
  },
  methods:{
     // en methods las mutaciones
    ...mapMutations([
    'actualizarUsuario',
    'actualizarAdministrador'
    ]),
    realizarLogout(){
      sessionStorage.clear();
      this.actualizarUsuario("Anonimo");
      this.actualizarAdministrador(false)
      this.$router.push('/');
    }
  }

}

</script>



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
</style>
