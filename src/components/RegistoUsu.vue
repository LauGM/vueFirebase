<template>
    <div>
    <div v-show="usuarioActivo!='Anonimo'">
        <p>No puedes registrarte, ya hay un usuario autenticado</p>
    </div>
    <div v-show="usuarioActivo=='Anonimo'">
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
        <v-form class="inner-block" @submit.prevent="submit">
            <h3>Registrate</h3>
            <div>
                <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                >
                <v-text-field
                        v-model="nombre"
                        label="Ingresa nombre"
                ></v-text-field>
                 <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div>
                <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                >
                <v-text-field
                        v-model="apellido"
                        label="Ingresa apellido"
                ></v-text-field>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div>
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                >
                <v-text-field
                        v-model="email"
                        label="Ingresa tu email"
                ></v-text-field>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div>
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    vid="confirmation"
                    rules="required|max:12|min:6"
                >
                <!-- vid confirmation me sirve para vincular con el campo de abajo y que sean iguales -->
                <v-text-field
                        v-model="clave1"
                        label="Ingresa tu clave"
                ></v-text-field>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div class="form-group">
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    
                    rules='required|max:12|min:6|confirmed:confirmation'
                >
                <v-text-field
                        v-model="clave2"
                        label="Ingresa nuevamente tu clave"
                ></v-text-field>
                <span>{{errors[0]}}</span>
                </validation-provider>
            </div>
            <div>
                <v-checkbox
                    id="checkbox"
                    v-model="admin"
                    label="es administrador?"
                ></v-checkbox>
            </div>
            <div class="botonera">
                <v-btn
                    color="alert"
                    class="mr-4"
                    @click="irALogin()"
                    >Ir al Login
                </v-btn>
                
                <v-btn
                    type="submit"
                    :disabled="invalid"
                    color="alert"
                    class="mr-4"
                    @click="validar()"
                    >Registrarse
                </v-btn>
            </div>
        </v-form>
        </validation-observer>
    </div>
        <v-alert v-if="respuestaPost"
                color="primary"
                dismissible
                outlined
                type="success"
        >El usuario fue registrado con éxito
        </v-alert>
    </div>
</template>

<script>
    // import axios from 'axios'
    import { required, email, max, min, confirmed } from 'vee-validate/dist/rules'
    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate'
    import {postUser} from '../firebase'
    import {mapState} from 'vuex'
    
    extend('required', {
        ...required,
        message: 'El campo no puede estar vacío',
    })

    extend('email', {
        ...email,
        message: 'El correo electrónico debe ser válido',
    })

    extend('max', {
        ...max,
        message: 'El campo no debe ser mayor a {length} caracteres',
    })

    extend('min', {
        ...min,
        message: 'El campo no deber ser menor de {length} caracteres',
    })

    extend('confirmed', {
        ...confirmed,
        message: 'debe ser igual al campo anterior',
    })

    export default {
        name:'RegUsu',
        data() {
            return {
                nombre:'',
                apellido:'',
                email:'',
                clave1:'',
                clave2:'',
                admin:false,
                respuestaPost:false
            }
        },
        components:{
            ValidationProvider,
            ValidationObserver
        },
        methods:{
            submit () {
                this.$refs.observer.validate()
            },
            async validar(){
                const nuevoUsu={
                    id:1,
                    email:this.email,
                    password:this.clave1,
                    nombre:this.nombre,
                    apellido:this.apellido,
                    admin:this.admin
                }
                console.log(nuevoUsu);
                this.respuestaPost=await postUser(nuevoUsu);
                this.hide_alert();
            },
            hide_alert() {
                window.setTimeout(() => {
                    this.respuestaPost=false;
                    console.log("oculto alert despues de 3 segundos");
                    this.irALogin();
                }, 3000)    
            },
            irALogin(){
                this.$router.push('/');
            }
        },
        computed:{
            ...mapState([
                'usuarioActivo'
            ])
        }
    }
</script>