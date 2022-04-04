<template>
    <section class="inner-block-grande">
        <h4>Listado de Productos en stock</h4>
        <v-container>
            <v-row>
                <v-col v-for="item of listaStock" :key="item.id"
                    cols="6"
                    md="4"
                >
                    <v-card
                        :loading="loading"
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
                        :src="item.imagen"
                    ></v-img>

                    <v-card-title>{{item.nombre}}</v-card-title>

                    <v-card-text>
                        <div class="my-4 text-subtitle-1">
                            Marca: {{item.marca}}
                        </div>
                        <div class="my-4 text-subtitle-2">
                            Precio:$ {{item.precio}}
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-text>
                
                    </v-card-text>

                    <v-card-actions class="botonera">
                    <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="agregar(item)"
                    >
                        Comprar
                    </v-btn>
                    <v-btn
                            class="mx-2"
                            fab
                            dark
                            x-small
                            color="deep-purple"
                            @click="redireccionar(item)"
                            >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                            </v-btn>
                    </v-card-actions>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
    //el siguiente json local en caso de superar las solicitudes diarias de mockaroo
    //import stock from '../data/productos.json'
    // import axios from 'axios'
    import{mapMutations} from 'vuex'
    import {getProducts} from '../firebase'
    export default ({
        name:'CarritoCompras',
        data(){
            return{
                agregados:JSON.parse(localStorage.getItem("carro"))||[],
                listaStock:[],
                loading:false
            }
        },
        async created(){
            //solicito el array de dos listas que devuelve getProducts:
            const listaIdData=await getProducts();
            //la lista de ids de firebase la guardo en el storage
            sessionStorage.setItem('ids',JSON.stringify(listaIdData[0]));
            //la lista de productos la guardo en listaStock local a este componente
            this.listaStock=listaIdData[1];
            console.log(this.listaStock);

        },
        methods:{
            // en methods las mutaciones
            ...mapMutations([
            'actualizarItemDetalle'
            ]),
            agregar(item){
                const repetido=this.agregados.findIndex(elemento => elemento.id ==item.id);
                console.log(repetido)
                if(repetido!=-1){
                    this.agregados[repetido].cantidad++;
                }else{
                    item.cantidad=1;
                    this.agregados.push(item);
                }
                console.table(this.agregados);
                localStorage.setItem("carro",JSON.stringify(this.agregados));
            },
            redireccionar(item){
                const posicion=this.listaStock.findIndex(producto =>producto.id==item.id);
                sessionStorage.setItem('posicionProd',posicion);
                this.actualizarItemDetalle(item);
                this.$router.push('/info');
            }
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando vuetify