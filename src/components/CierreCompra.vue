<template>
  <div>
    <h4>Completa el formulario para la entrega de tu pedido (solo Bs. As.)</h4>
    <validation-observer
        ref="observer"
        v-slot="{ invalid }"
    >
        <form @submit.prevent="submit">
        <validation-provider
            v-slot="{ errors }"
            name="Direccion"
            :rules="{
                required:true,
                regex:'^[A-Za-z]+([\ A-Za-z])',
                max:30
            }"
        >
            <v-text-field
            v-model="dire"
            :counter="30"
            :error-messages="errors"
            label="Direccion de entrega"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="Codigo Postal"
            :rules="{
            required: true,
            digits: 4
            }"
        >
            <v-text-field
            v-model="cp"
            :counter="4"
            :error-messages="errors"
            label="Codigo postal"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="Celular"
            :rules="{
            required: true,
            digits: 10,
            regex: '^(11)\\d{8}$'
            }"
        >
            <v-text-field
            v-model="celular"
            :counter="10"
            :error-messages="errors"
            label="Celular de Bs. As."
            required
            ></v-text-field>
        </validation-provider>
        <!-- aqui no necesito validation provider> -->
        <v-checkbox
          v-model="checkbox"
          value="1"
          label="Abona en efectivo"
          type="checkbox"
        ></v-checkbox>
        <v-btn
            @click="armarObjeto"
            class="mr-4"
            type="submit"
            :disabled="invalid"
        >
            Comprar
        </v-btn>
        <v-btn @click="clear">
            Borrar
        </v-btn>
        </form>
    </validation-observer>
  </div>
</template>

<script>
  import { required, digits, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import {postPedido} from '../firebase'
  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} necesita ser de {length} digitos. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} no puede estar vacío',
  })

  extend('max', {
    ...max,
    message: '{_field_} no puede ser mayor que {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} no coincide con uno valido {regex}',
  })

  export default {
    name:'CierreCompra',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      dire: '',
      cp:'',
      celular: '',
      checkbox: null
    }),
    props:{
      pedido:Array,
      total:Number
    },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.dire = ''
        this.cp = ''
        this.celular = ''
        this.checkbox = null
        this.$refs.observer.reset()
      },
      armarObjeto(){
        const usuarioLogueado=JSON.parse(sessionStorage.getItem("logged"));
          const nuevoPedido={
              nombre:usuarioLogueado.nombre +" "+ usuarioLogueado.apellido,
              direccion:this.dire,
              cp:this.cp,
              celular:this.celular,
              email:usuarioLogueado.email,
              efectivo:this.checkbox=="1",
              fechaPedido:new Date().toLocaleString('es'),
              pedido: this.pedido,
              totalAPagar: this.total
          };
          console.log(nuevoPedido);
        //guardar en firebase el pedido
        postPedido(nuevoPedido);
      }
    },
  }
</script>