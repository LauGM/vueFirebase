<template>
    <section class="inner-block-grande">
        <v-container v-if="!administrador" class="botonera">
            <v-btn 
                color='alert'
                class='mr-4'
                @click='irAlCarro()'
            >Ir al Carro  🛒
            </v-btn>
        </v-container>
        <v-container v-else class="botonera">
            <v-btn 
                color='alert'
                class='mr-4'
                @click='irAPedidos()'
            >Ir a listado de pedidos  🛒
            </v-btn>
            <v-btn 
                color='alert'
                class='mr-4'
                @click='cargarProd()'
            >Nuevo Producto 🆕
            </v-btn>
        </v-container>
         <v-divider class="mx-4"></v-divider>
        <h4>Listado de Productos en stock</h4>
        <v-alert
            v-model="alert"
            dark icon="mdi-star"
        >
        Lo agregaste al Carro
        </v-alert>
        <v-alert
            v-model="eliminado"
            dark icon="mdi-star"
        >
        El producto fue eliminado con exito
        </v-alert>
        <v-container>
            <v-row>
                <v-col v-for="item of listaStock" :key="item.nombre"
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
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-if="administrador"
                                class="mx-2"
                                fab
                                dark
                                x-small
                                color="alert"
                                v-bind="attrs"
                                v-on="on"
                                @click="eliminar(item)"
                            >
                            <v-icon dark>
                                mdi-delete-outline
                            </v-icon>
                            </v-btn>
                        </template>
                        <span>Eliminar {{item.nombre}}</span>
                    </v-tooltip>
                    
                    </v-card-actions>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
</section>
</template>

<script>
    import{mapState,mapMutations} from 'vuex'
    import {getProducts, deleteProd,getPedidos} from '../firebase'

    export default ({
        name:'CarritoCompras',
        data(){
            return{
                agregados:JSON.parse(localStorage.getItem("carro"))||[],
                listaStock:[],
                alert:false,
                eliminado:false
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
                const repetido=this.agregados.findIndex(elemento => elemento.nombre == item.nombre);
                //en caso de existir ya en el carro devuelve -1
                if(repetido!=-1){
                    this.agregados[repetido].cantidad++;
                }else{
                    const prodAAgregar={
                        cantidad: 1,
                        marca: item.marca,
                        nombre: item.nombre,
                        precio:item.precio
                    }
                    console.log(prodAAgregar);
                    this.agregados.push(prodAAgregar);
                }
                localStorage.setItem("carro",JSON.stringify(this.agregados));
                this.alert=true;
                this.hide_alert();
            },
            redireccionar(item){
                const posicion=this.listaStock.findIndex(producto =>producto.nombre==item.nombre);
                sessionStorage.setItem('posicionProd',posicion);
                this.actualizarItemDetalle(item);
                this.$router.push('/info');
            },
            async eliminar(item){
                const pos = this.listaStock.findIndex(producto => producto.nombre == item.nombre);
                const idsProds = JSON.parse(sessionStorage.getItem('idsProds'));
                const idProdABorrar=idsProds[pos];
                console.log(idProdABorrar);
                this.eliminado= await deleteProd(idProdABorrar);
                this.hide_alert();
                this.$router.go();
            },
            cargarProd(){
                this.$router.push('/new');
            },
            irAlCarro(){
                this.$router.push("/cart");
            },
            async irAPedidos(){
                //solicito el array de Pedidos:
                const listaPedidos=await getPedidos();
                const idsPedidos=listaPedidos[0];
                const pedidos=listaPedidos[1];
                //la lista de ids de pedidos de firebase la guardo en el storage
                sessionStorage.setItem('idsPedidos',JSON.stringify(idsPedidos));
                //la lista de pedidos de firebase la guardo en el storage
                sessionStorage.setItem('pedidos',JSON.stringify(pedidos));
                this.$router.push("/pedidos");
            },
            hide_alert() {
                window.setTimeout(() => {
                    this.alert = false;
                    this.eliminado=false;
                    console.log("oculto alert despues de 2 segundos");
                }, 3000)    
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