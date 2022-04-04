<template>
    <section class="row inner-block">
        <!-- <h4>Informacion de Producto: {{producto.nombre}}</h4>
        <img :src="producto.imagen">
        <p>Marca: {{producto.marca}}</p>
        <p>Detalle: {{producto.info}}
        <p>Precio: {{producto.precio | filtroDecimal}}</p> -->
        <p>En construccion</p>
        <article class="botonera">
            <button class="btn btn-dark">Comprar</button>
            <button class="btn btn-secondary">Regresar</button>
        </article>
    </section>
</template>

<script>
    export default ({
        name:'InfoProd',
        props:{
            producto: Object
        },
        mounted(){
            console.info(`mis props son ${JSON.stringify(this.$props)}`);
        }
    })
</script>

// no utilizo estilos aqui porque estoy usando bootstrap