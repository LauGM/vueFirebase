import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioActivo:JSON.parse(localStorage.getItem("logged"))?JSON.parse(localStorage.getItem("logged")).nombre:"Anonimo"
  },
  getters: {
    getUsuActivo:(state)=>{
      return state.usuarioActivo
    }
  },
  mutations: {
    actualizarUsuario(state,nuevoUsuario){
      state.usuarioActivo=nuevoUsuario;
    }
  },
  actions: {
  },
  modules: {
  }
})
