<template> 
    <section class="inner-block-grande">
        <div data-app class="text-center">
        <v-container>
            <v-data-table
                :headers="headers"
                :items="enCarro"
                item-key="nombre"
                :items-per-page="5"
                class="elevation-1"
            >
            
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Productos en el carro</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog
                        v-model="dialog"
                        width="500"
                        >
                        <validation-observer
                                ref="observer"
                                v-slot="{ invalid }"
                            >
                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                                Modifica la cantidad de: {{editedItem.nombre}}
                            </v-card-title>

                            <v-divider></v-divider>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="Cantidad"
                                    :rules="{
                                        required: true,
                                        digits: 1,
                                        regex: '^([1-5])$'
                                    }"
                                >
                                    <v-text-field
                                    type="number"
                                    v-model="editedItem.cantidad"
                                    :error-messages="errors"
                                    label="Cantidad"
                                    required
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="cerrar()"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="guardar()"
                                    type="submit"
                                    :disabled="invalid"
                                >
                                    Modificar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        </validation-observer>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.accion`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click.close="modificar(item);"
                >
                    mdi-pencil
                </v-icon>
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
        </div>
        <CierreCompra :pedido="enCarro" :total="calcularTotal" v-if="formulario"/>
    </section>
</template>

<script>
    import { required, digits, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationProvider, ValidationObserver} from 'vee-validate'
    import CierreCompra from "./CierreCompra.vue";
    import {mapState} from 'vuex';

    extend('digits', {
    ...digits,
    message: '{_field_} necesita ser de {length} digito y positivo. ({_value_})',
    })

    extend('required', {
        ...required,
        message: '{_field_} no puede estar vacío',
    })

    extend('regex', {
        ...regex,
        message: '{_field_} {_value_} no coincide con uno valido {regex}',
    })

    export default ({
        name:'TablaProds',
        components:{
            ValidationObserver,
            ValidationProvider,
            CierreCompra
        },
        data(){
            return{
                enCarro:JSON.parse(localStorage.getItem("carro"))||[],
                headers: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        sortable: true,
                        value: 'nombre',
                    },
                    { text: 'Marca', value: 'marca' },
                    { text: 'Precio', value: 'precio' },
                    { text: 'Cantidad', value: 'cantidad'},
                    { text: 'Acción', value: 'accion',sortable:false}
                ],
                defaultItem:{
                    cantidad: 0,
                    marca: '',
                    nombre: '',
                    precio:0
                },
                editedIndex: -1,
                editedItem: {
                    cantidad: 0,
                    marca: '',
                    nombre: '',
                    precio: 0
                },
                dialog:false,
                totalCompra:0,
                formulario:false
            }
        },
        watch: {
            dialog (val) {
            val || this.cerrar()
            }
        },
        methods:{
            submit () {
                this.$refs.observer.validate()
            },
            modificar (item) {
                this.editedIndex = this.enCarro.indexOf(item);
                console.log("editedIndex: "+this.editedIndex);
                this.editedItem = Object.assign({}, item);
                console.log(this.editedItem);
                this.dialog=true;
            },
            cerrar () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },
            guardar () {
                if (this.editedIndex > -1) {
                    Object.assign(this.enCarro[this.editedIndex], this.editedItem);
                    localStorage.setItem('carro',JSON.stringify(this.enCarro));
                } else {
                    this.enCarro.push(this.editedItem);
                }
                this.cerrar()
            },

            eliminar(item){
                console.log(item)
                const index=this.enCarro.findIndex(elemento=>elemento==item);

                console.log("voy a remover "+index)
                this.enCarro.splice(index,1);
                console.log("Lo que quedo en carro:")
                console.log(this.enCarro);
                localStorage.setItem('carro',JSON.stringify(this.enCarro));
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
