<template>
    <div v-show="usuarioActivo=='Anonimo'">
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
        <v-form class="inner-block" @submit.prevent="submit">
            <h3>Ingresar</h3>
            <div class="form-group">
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                >
                    <v-text-field
                        v-model="usu"
                        label="Ingresa tu e-mail"
                    ></v-text-field>
                    <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="form-group">
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|max:12|min:6"
                >
                    <v-text-field
                        v-model="pass"
                        label="Ingresa tu clave"
                    ></v-text-field>
                    <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="botonera">
                <v-btn
                    color="alert"
                    class="mr-4"
                    @click="irARegistro()"
                    >Registrate ahora
                </v-btn>
                <v-btn
                    :disabled="invalid"
                    color="alert"
                    class="mr-4"
                    @click="validar()"
                    >Ingresar
                </v-btn>
            </div>
            <span v-if="encontrado===undefined">Usuario o PassWord incorrecta</span>
        </v-form>
        </validation-observer>
    </div>
</template>

<script>
    //el siguiente json local en caso de superar las solicitudes diarias de mockaroo
    //import usus from '../data/usuarios.json'
    // import axios from 'axios'
    import {getUsers} from '../firebase'
    import { required, email, max, min } from 'vee-validate/dist/rules'
    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate'

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    extend('max', {
        ...max,
        message: '{_field_} no debe ser mayor a {length} caracteres',
    })

    extend('min', {
        ...min,
        message: '{_field_} no deber ser menor de {length} caracteres',
    })

    import {mapMutations, mapState} from 'vuex'

    export default {
        name:'LogIn',
        components:{
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                usu:"",
                pass:"",
                listaUsu:[],
                encontrado:null
            }
        },
        async created(){
            //solicito la lista de usuarios a firebase
            this.listaUsu=await getUsers();
            console.log("👇Lista completa de usuarios en BD")
            console.log(this.listaUsu);
        },
        
        methods:{
              // en methods las mutaciones
            ...mapMutations([
            'actualizarUsuario',
            'actualizarAdministrador'
            ]),
            submit () {
                this.$refs.observer.validate()
            },
            validar(){
                this.encontrado=this.listaUsu.find(usuario => usuario.email==this.usu && usuario.password==this.pass);
                console.log("👇Usuario encontrado");
                console.log(this.encontrado)
                if(this.encontrado){
                    console.log("Usuario autenticado con exito");
                    sessionStorage.setItem("logged",JSON.stringify(this.encontrado));
                    this.actualizarUsuario(this.encontrado.nombre);
                    this.actualizarAdministrador(this.encontrado.admin)
                    this.$router.push('/products');
                }

            },
            irARegistro(){
                this.$router.push('/register');
            }
        },
        computed:{
            ...mapState([
                'usuarioActivo'
            ])
        }
    }
</script>