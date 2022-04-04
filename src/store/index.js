import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioActivo:JSON.parse(localStorage.getItem("logged"))?JSON.parse(localStorage.getItem("logged")).nombre:"Anonimo",
    administrador:JSON.parse(localStorage.getItem("logged"))?JSON.parse(localStorage.getItem("logged")).admin:false,
    itemDetalle:{}
  },
  getters: {
    getUsuActivo:(state)=>{
      return state.usuarioActivo
    },
    getItemDetalle:(state)=>{
      return state.itemDetalle
    }
  },
  mutations: {
    actualizarUsuario(state,nuevoUsuario){
      state.usuarioActivo=nuevoUsuario;
    },
    actualizarAdministrador(state,valor){
      state.administrador=valor;
    },
    actualizarItemDetalle(state,itemNuevo){
      state.itemDetalle=itemNuevo;
    }
  },
  actions: {
  },
  modules: {
  }
})
