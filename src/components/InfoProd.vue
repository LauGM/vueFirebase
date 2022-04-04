<template>
    <section class="inner-block">
        <h4>Información detallada del Producto</h4>
        <v-card
                        class="mx-auto my-4"
                    >
                    <template slot="progress">
                    <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                    ></v-progress-linear>
                    </template>

                    <v-img
                        height="180"
                        :src="itemDetalle.imagen"
                    ></v-img>

                    <v-card-title>{{itemDetalle.nombre}}</v-card-title>

                    <v-card-text>
                        <div class="my-4 text-subtitle-1">
                            Marca: {{itemDetalle.marca}}
                        </div>
                        <div class="my-4 text-subtitle-2">
                            Detalle: {{itemDetalle.info}}
                        </div>
                    </v-card-text>


                    <v-divider class="mx-4"></v-divider>

                    <v-card-text>
                        <div class="my-4 text-subtitle-2">
                            Precio actual:$ {{itemDetalle.precio}}
                        </div>
                        <v-text-field v-show="administrador==true"
                            v-model="nuevoPrecio"
                            label="Modificar Precio actual $"
                            :rules="rules"
                            > 
                        </v-text-field>
                    </v-card-text>

                    <v-card-actions class="botonera">
                    <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="regresar()"
                    >
                        Regresar
                    </v-btn>
                    <v-btn
                        v-show="administrador==true"
                        color="deep-purple lighten-2"
                        text
                        @click="actualizar()"
                    >
                        Actualizar
                    </v-btn>
                    </v-card-actions>
                </v-card>
    </section>
</template>

<script>
    import {updateProd} from '../firebase'
    import {mapGetters, mapState} from 'vuex'
    export default ({
        name:'InfoProd',
        data(){
            return{
                nuevoPrecio:0,
                rules: [
                    value => !!value || 'Campo obligatorio.',
                    value => (!isNaN(value)) || 'Debe ser un numero',
                ]
            }
        },
        methods:{
             regresar(){
                this.$router.push('/products');
            },
            actualizar(){
                console.log(this.$store.state.itemDetalle)
                const itemActualizado=this.$store.state.itemDetalle;
                itemActualizado.precio=this.nuevoPrecio;
                // actualizarItemDetalle(itemActualizado)
                //busco la posicion el elemento que estoy visualizando en pantalla
                const pos=parseInt(sessionStorage.getItem('posicionProd'));
                //traigo el array de ids de firestore
                const idFireStore=JSON.parse(sessionStorage.getItem('ids'));
                //envio el id en esa posicion como parametro 
                updateProd(idFireStore[pos],itemActualizado);
            }
        },
        computed:{
            ...mapState([
                'itemDetalle',
                'administrador'
            ]),
            ...mapGetters([
                'getItemDetalle'
            ])
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando bootstrap