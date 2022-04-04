<template>
    <v-app class="inner-block-grande">
        <h4>Productos en el Carrito</h4>
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
            <v-btn class="btn btn-dark">Comprar</v-btn>
            <p>Total de la compra $ {{calcularTotal}}</p>
            <v-btn class="btn btn-secondary">Regresar</v-btn>
        </article>
    </v-app>
</template>

<script>
    export default ({
        name:'TablaProds',
        data(){
            return{
                enCarro:JSON.parse(localStorage.getItem("carro"))||[],
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
                    { text: 'Acción', value: 'accion',sortable:false}
                    ],
                totalCompra:0
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
                localStorage.setItem('carro',JSON.stringify(this.enCarro));
            }
        },
        computed:{
            calcularTotal(){
                let total=0;
                for (const prod of this.enCarro){
                    total+=prod.precio;
                }
                return total;
            }
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando bootstrap