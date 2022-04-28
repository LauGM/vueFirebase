<template>
    <section class="inner-block">
        <h4>Ingresa los datos del Producto nuevo</h4>
        <v-card
            class="mx-auto my-4"
        >   <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>
            <v-card-title>
                <v-text-field
                    v-model="nuevoNombre"
                    label="Nombre"
                    :rules="rulesDetalle"
                    > 
                </v-text-field>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="nuevaMarca"
                    label="Marca"
                    :rules="rulesDetalle"
                    > 
                </v-text-field>
            </v-card-text>

            <v-card-text>
                <v-text-field
                    v-model="nuevaImagen"
                    label="Link imagen 180x180 px max"
                    :rules="rulesDetalle"
                    > 
                </v-text-field>
            </v-card-text>

             <v-divider class="mx-4"></v-divider>

            <v-card-text>
                <v-textarea
                    v-model="nuevoDetalle"
                    label="Detalle"
                    :rules="rulesDetalle"
                    > 
                </v-textarea>
            </v-card-text>


            <v-divider class="mx-4"></v-divider>

            <v-card-text>
                <v-text-field
                    v-model="nuevoPrecio"
                    label="Precio $"
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
                color="deep-purple lighten-2"
                text
                @click="guardar()"
            >
                Guardar
            </v-btn>
            </v-card-actions>
        </v-card>
        <v-alert v-if="guardado"
                color="primary"
                dismissible
                outlined
                type="success"
            >El producto fue guardado con éxito</v-alert>
    </section>
</template>

<script>
    import {postProd} from '../firebase'
    export default ({
        name:'NuevoProd',
        data(){
            return{
                guardado:false,
                nuevoNombre:'',
                nuevaMarca:'',
                nuevoPrecio:'',
                nuevoDetalle:'',
                nuevaImagen:'',
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
            async guardar(){
                const itemNuevo={
                    nombre:this.nuevoNombre,
                    marca:this.nuevaMarca,
                    info:this.nuevoDetalle,
                    precio:this.nuevoPrecio,
                    imagen:this.nuevaImagen
                }
                console.log(itemNuevo);
                this.guardado= await postProd(itemNuevo);
            }
        }
    })
</script>