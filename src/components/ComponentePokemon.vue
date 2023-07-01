<template>
    <div class="contenedor-vertical">
        <img
    v-if="muestraPokemon"
    :src="imagenFuente(id)"
    alt="No se puede mostrar la imagen."
  />
  <img
    class="ocultar"
    v-if="!muestraPokemon"
    :src="imagenFuente(id)"
    alt="No se puede mostrar la imagen."
  />
  <p v-if="muestraPokemon">{{ nombre }}</p>
  <p v-if="!muestraPokemon">XXXXXXXXXXXXXXX</p>
    </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    muestraPokemon: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    imagenFuente(id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
.contenedor-vertical{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
}
.ocultar {
  background-color: black;
  height: 100%;
  filter: brightness(0);
  width: 200px;
  height: 200px;
}
</style>