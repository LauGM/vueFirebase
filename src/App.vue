<template>
  <div id="app">
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Registrate</router-link> |
      <router-link to="/products">Productos</router-link> |
      <router-link to="/info">Info</router-link> |
      <router-link to="/cart">Carro 🛒</router-link> 
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

