<template>
    <section class="inner-block-grande">
        <h4>Listado de Productos en stock</h4>
        <v-alert
            v-model="alert"
            dark icon="mdi-star"
        >
        Lo agregaste al Carro
        </v-alert>
<v-container>
            <v-row>
                <v-col v-for="item of listaStock" :key="item.id"
                    cols="6"
                    md="4"
                >
                    <v-card
                        class="mx-auto my-4"
                    >

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

                    <v-card-actions class="botonera">
                    <v-btn v-if="!administrador"
                        color="alert"
                        text
                        @click="agregar(item)"
                    >
                        Comprar
                    </v-btn>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    x-small
                                    color="alert"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="redireccionar(item)"
                                >
                                <v-icon dark v-if="!administrador">
                                    mdi-information-variant
                                </v-icon>
                                <v-icon dark v-else>
                                    mdi-wrench
                                </v-icon>
                            </v-btn>
                        </template>
                        <span v-if="!administrador">Ver más info de {{item.nombre}}</span>
                        <span v-else>Modificar {{item.nombre}}</span>
                    </v-tooltip>
                    
                    </v-card-actions>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-btn 
                color='alert'
                class='mr-4'
                @click='irAlCarro()'
            >Ir al Carro  🛒</v-btn>
        </v-container>
</section>
</template>

<script>
    import{mapState,mapMutations} from 'vuex'
    import {getProducts} from '../firebase'
    export default ({
        name:'CarritoCompras',
        data(){
            return{
                agregados:JSON.parse(localStorage.getItem("carro"))||[],
                listaStock:[],
                alert:false
            }
        },
        async created(){
            //solicito el array de dos listas que devuelve getProducts:
            const listaIdData=await getProducts();
            //la lista de ids de firebase la guardo en el storage
            sessionStorage.setItem('idsProds',JSON.stringify(listaIdData[0]));
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
                //en caso de existir ya en el carro devuelve -1
                if(repetido!=-1){
                    this.agregados[repetido].cantidad++;
                }else{
                    const prodAAgregar={
                        id: item.id,
                        cantidad: 1,
                        marca: item.marca,
                        nombre: item.nombre,
                        precio:item.precio
                    }
                    console.log(prodAAgregar);
                    this.agregados.push(prodAAgregar);
                }
                console.table(this.agregados);
                localStorage.setItem("carro",JSON.stringify(this.agregados));
                this.alert=true;
                this.hide_alert();
            },
            redireccionar(item){
                const posicion=this.listaStock.findIndex(producto =>producto.id==item.id);
                sessionStorage.setItem('posicionProd',posicion);
                this.actualizarItemDetalle(item);
                this.$router.push('/info');
            },
            irAlCarro(){
                this.$router.push("/cart");
            },
            hide_alert() {
                console.log('Hide')
                // `event` is the native DOM event
                window.setTimeout(() => {
                    this.alert = false;
                    console.log("hide alert after 3 seconds");
                }, 2000)    
            }
        },
        computed:{
            ...mapState([
                'administrador'
            ])
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando vuetify