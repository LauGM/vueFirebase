<template>
    <section class="inner-block-grande">
        <h4>Productos en el Carrito</h4>
        <v-container>
            <v-data-table
                :headers="headers"
                :items="enCarro"
                item-key="nombre"
                :items-per-page="5"
                class="elevation-1"
            >
            <template v-slot:[`item.accion`]="{ item }">
                <v-icon
                    small
                    @click="eliminar(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            </v-data-table>
            <p v-if="enCarro.length==0">No agregaste nada al carro aun</p>
            <article class="botonera">
                <v-btn v-if="usuarioActivo!='Anonimo' && calcularTotal!=0"
                    color='alert'
                    class='mr-4'
                    @click='comprar()'
                >Realizar pedido</v-btn>
                <p v-else>Login y agregar productos para comprar</p>
                <v-btn 
                    color='alert'
                    class='mr-4'
                    @click='regresar()'
                >Regresar</v-btn>
            </article>
            <p>Total de la compra $ {{calcularTotal | filtroDecimal}}</p>
        </v-container>
        <CierreCompra :pedido="enCarro" :total="calcularTotal" v-if="formulario"/>
    </section>
</template>

<script>
    import CierreCompra from "./CierreCompra.vue";
    import {mapState} from 'vuex';

    export default ({
        name:'TablaProds',
        components:{
            CierreCompra
        },
        data(){
            return{
                enCarro:JSON.parse(sessionStorage.getItem("carro"))||[],
                headers: [
                    { text: 'Id', value: 'id' },
                    {
                        text: 'Nombre',
                        align: 'start',
                        sortable: true,
                        value: 'nombre',
                    },
                    { text: 'Marca', value: 'marca' },
                    { text: 'Precio', value: 'precio' },
                    { text: 'Cantidad', value: 'cantidad' },
                    { text: 'Acción', value: 'accion',sortable:false}
                    ],
                totalCompra:0,
                formulario:false
            }
        },
        methods:{
            eliminar(item){
                console.log(item)
                const index=this.enCarro.findIndex(elemento=>elemento==item);

                console.log("voy a remover "+index)
                this.enCarro.splice(index,1);
                console.log("Lo que quedo en carro:")
                console.log(this.enCarro);
                sessionStorage.setItem('carro',JSON.stringify(this.enCarro));
            },
            comprar(){
                this.formulario=true;
                console.log("A formulario de compra")
            },
            regresar(){
                this.$router.push('/products');
            }
        },
        computed:{
            ...mapState([
                'usuarioActivo'
            ]),
            calcularTotal(){
                let total=0;
                for (const prod of this.enCarro){
                    total+=(prod.precio * prod.cantidad);
                }
                return total;
            }
        }
    })
</script>
