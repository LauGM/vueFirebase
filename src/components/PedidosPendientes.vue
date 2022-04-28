<template> 
    <section class="inner-block-grande">
        <v-alert
            v-model="borrado"
            dark icon="mdi-star"
        >
            Pedido entregado se eliminó
        </v-alert>
        <v-container>
            <v-data-table
                :headers="headers"
                :items="pedidos"
                item-key="fechaPedido"
                :items-per-page="5"
                class="elevation-1"
            >
            
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Pedidos Pendientes de entrega</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <template v-slot:[`item.accion`]="{ item }">
                <v-icon
                    small
                    @click="eliminar(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            </v-data-table>
            <p v-if="pedidos.length==0">No hay pedidos pendientes</p>
            <article class="botonera">
                <v-btn 
                    color='alert'
                    class='mr-4'
                    @click='regresar()'
                >Regresar</v-btn>
            </article>
        </v-container>
    </section>
</template>

<script>
import { deletePedido } from "@/firebase";

    export default ({
        name:'PedidosPendientes',
        data(){
            return{
                pedidos:JSON.parse(sessionStorage.getItem("pedidos"))||[],
                headers: [
                    {
                        text: 'Fecha',
                        align: 'start',
                        sortable: true,
                        value: 'fechaPedido',
                    },
                    { text:'Nombre', value:'nombre'},
                    { text:'Direccion', value:'direccion' },
                    { text:'C.P.', value:'cp' },
                    { text:'Celular', value:'celular'},
                    { text:'Total $',value:'totalAPagar'},
                    { text:'Acción', value:'accion',sortable:false}
                ],
                borrado:false
            }
        },
        methods:{
            async eliminar(item){
                console.log(item)
                const index=this.pedidos.findIndex(elemento=>elemento==item);
                const idsPedidos=JSON.parse(sessionStorage.getItem('idsPedidos'));
                const idABorrar=idsPedidos[index];
                console.log("voy a remover "+index)
                this.pedidos.splice(index,1);
                idsPedidos.splice(index,1);
                console.log("Lo que quedo en pedidos:")
                console.log(this.pedidos);
                this.borrado=await deletePedido(idABorrar);
                //actualizo el storage
                sessionStorage.setItem('pedidos',JSON.stringify(this.pedidos));
                sessionStorage.setItem('idsPedidos',JSON.stringify(idsPedidos)); 
                this.hide_alert();   
            },
            hide_alert() {
                window.setTimeout(() => {
                    this.borrado=false;
                    console.log("oculto alert despues de 3 segundos");
                }, 3000)    
            },
            regresar(){
                this.$router.push('/products');
            }
        }
    })
</script>