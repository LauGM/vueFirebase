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

            <v-img v-if="!administrador"
                height="180"
                :src="itemDetalle.imagen"
            ></v-img>
            <v-card-text v-else>
                <v-text-field
                    v-model="nuevaImagen"
                    label="Modificar imagen actual"
                    :rules="rulesDetalle"
                    > 
                </v-text-field>
            </v-card-text>

            <v-card-title v-if="!administrador">{{itemDetalle.nombre}}</v-card-title>
            <v-card-title v-else>
                <v-text-field
                    v-model="nuevoNombre"
                    label="Modificar Marca actual"
                    :rules="rulesDetalle"
                    > 
                </v-text-field>
            </v-card-title>

            <v-card-text>
                <div v-if="administrador==false" class="my-4 text-subtitle-1">
                    <strong>Marca:</strong> {{itemDetalle.marca}}
                </div>
                <v-text-field v-else
                    v-model="nuevaMarca"
                    label="Modificar Marca actual"
                    :rules="rulesDetalle"
                    > 
                </v-text-field>
            </v-card-text>

             <v-divider class="mx-4"></v-divider>

            <v-card-text>
                <div v-if="administrador==false" class="my-4 text-subtitle-2">
                    <strong>Detalle:</strong> {{itemDetalle.info}}
                </div>

                <v-textarea v-else
                    v-model="nuevoDetalle"
                    label="Modificar Detalle del Producto"
                    :rules="rulesDetalle"
                    > 
                </v-textarea>
            </v-card-text>


            <v-divider class="mx-4"></v-divider>

            <v-card-text>
                <div v-if="administrador==false" class="my-4 text-subtitle-2">
                    <strong>Precio actual:$</strong> {{itemDetalle.precio}}
                </div>
                <v-text-field v-else
                    v-model="nuevoPrecio"
                    label="Modificar Precio actual $"
                    :rules="rulesPrecio"
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
                nuevoNombre:this.$store.state.itemDetalle.nombre,
                nuevaMarca:this.$store.state.itemDetalle.marca,
                nuevoPrecio:this.$store.state.itemDetalle.precio,
                nuevoDetalle:this.$store.state.itemDetalle.info,
                nuevaImagen:this.$store.state.itemDetalle.imagen,
                rulesPrecio: [
                    value => !!value || 'Campo obligatorio.',
                    value => (!isNaN(value)) || 'Debe ser un numero',
                ],
                rulesDetalle: [
                    value => !!value || 'Campo obligatorio.'
                ]
            }
        },
        methods:{
             regresar(){
                this.$router.push('/products');
            },
            async actualizar(){
                console.log(this.$store.state.itemDetalle)
                const itemActualizado={
                    nombre:this.nuevoNombre,
                    marca:this.nuevaMarca,
                    info:this.nuevoDetalle,
                    precio:this.nuevoPrecio,
                    imagen:this.nuevaImagen
                }
                console.log(itemActualizado);
                // actualizarItemDetalle(itemActualizado)
                //busco la posicion el elemento que estoy visualizando en pantalla
                const pos=parseInt(sessionStorage.getItem('posicionProd'));
                //traigo el array de ids de firestore
                const idFireStore=JSON.parse(sessionStorage.getItem('idsProds'));
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