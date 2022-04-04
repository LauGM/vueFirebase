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
                        height="300"
                        :src="item.imagen"
                    ></v-img>

                    <v-card-title>{{item.marca}}</v-card-title>

                    <v-card-text>
                        <div class="my-4 text-subtitle-1">
                            Modelo: {{item.nombre}}
                        </div>
                        <div class="my-4 text-subtitle-2">
                            $ {{item.precio | filtroDecimal}}
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-text>
                
                    </v-card-text>

                    <v-card-actions>
                    <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="agregar(item)"
                    >
                        Comprar
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
    import axios from 'axios'
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
            const URL="https://my.api.mockaroo.com/products.json?key=140b4040";
            await axios.get(URL)
            .then((response) => (this.listaStock=response.data))
            .catch(function (err) {
                console.error(err);
            })
        },
        // beforeMount(){
        //     if(this.listaStock.length==0){
        //         console.log("Utilizando el archivo local")
        //         console.log(stock)
        //         this.listaStock=stock;
        //         console.log("Stock local cargado:");
        //     }
        // },
        methods:{
            agregar(item){
                this.agregados.push(item);
                console.table(this.agregados);
                localStorage.setItem("carro",JSON.stringify(this.agregados));
            }
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando vuetify