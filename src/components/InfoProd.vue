<template>
    <section class="inner-block">
        <h4>Información detallada del Producto</h4>
        <v-card
            v-if="Object.keys(itemDetalle).length !== 0"
            class="mx-auto my-4"
        >   <template slot="progress">
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
        <v-card
            v-else
            class="mx-auto my-4"
        >
            <v-card-text>
                No seleccionaste ningun Producto
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="alert"
                    text
                    @click="regresar()"
                >
                    Regresar
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-alert v-if="actualizado"
                color="primary"
                dismissible
                outlined
                type="success"
            >El producto fue actualizado con éxito</v-alert>
    </section>
</template>

<script>
    import {updateProd} from '../firebase'
    import {mapState} from 'vuex'
    export default ({
        name:'InfoProd',
        data(){
            return{
                actualizado:false,
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
            async actualizar(){
                console.log(this.$store.state.itemDetalle)
                const itemActualizado=this.$store.state.itemDetalle;
                itemActualizado.precio=this.nuevoPrecio;
                // actualizarItemDetalle(itemActualizado)
                //busco la posicion el elemento que estoy visualizando en pantalla
                const pos=parseInt(sessionStorage.getItem('posicionProd'));
                //traigo el array de ids de firestore
                const idFireStore=JSON.parse(sessionStorage.getItem('ids'));
                //envio el id en esa posicion como parametro 
                this.actualizado= await updateProd(idFireStore[pos],itemActualizado);
            }
        },
        computed:{
            ...mapState([
                'itemDetalle',
                'administrador'
            ])
        }
    })
</script>