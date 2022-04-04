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
                <v-text-field
                        v-model="nombre"
                        label="Ingresa nombre"
                ></v-text-field>
            </div>
            <div>
                <v-text-field
                        v-model="apellido"
                        label="Ingresa apellido"
                ></v-text-field>
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
                    rules="required|max:12|min:6"
                >
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
                    rules="required|max:12|min:6"
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
            <div>
                <v-btn
                    type="submit"
                    :disabled="invalid"
                    color="alert"
                    class="mr-4"
                    @click="validar()"
                    >Registrarse
                </v-btn>
            </div>
            <p class="forgot-password text-right">
                Ya estas registrado ?
            </p>
        </v-form>
        </validation-observer>
    </div>
    </div>
</template>

<script>
    // import axios from 'axios'
    import { required, email, max, min } from 'vee-validate/dist/rules'
    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate'
    import {postUser} from '../firebase'
    import {mapState} from 'vuex'
    
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

    export default {
        name:'RegUsu',
        data() {
            return {
                nombre:'',
                apellido:'',
                email:'',
                clave1:'',
                clave2:'',
                admin:false
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
            validar(){
                const nuevoUsu={
                    id:1,
                    email:this.email,
                    password:this.clave1,
                    nombre:this.nombre,
                    apellido:this.apellido,
                    admin:true
                }
                console.log(nuevoUsu);
                postUser(nuevoUsu)
            }
        },
        computed:{
            ...mapState([
                'usuarioActivo'
            ])
        }
    }
</script>