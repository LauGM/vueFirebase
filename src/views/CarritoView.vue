<template>
<!-- para usar los v-tooltips pide que el div que contiene al componente que lo usa tenga el atributo data-app -->
  <div data-app class="products">
      <carrito-compras />
  </div>
</template>

<script>
import CarritoCompras from '@/components/CarritoCompras.vue'
export default {
  components: { CarritoCompras },

}
</script>

<style>

</style>