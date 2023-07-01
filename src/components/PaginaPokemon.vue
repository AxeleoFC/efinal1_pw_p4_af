<template>
  <div v-if="!finJuego">
    <div class="contenedor-labels">
      <label>Puntaje: {{ puntaje }}</label>
      <label>intento: {{ intentos }}</label>
    </div>
    <div class="contenedor-horizontal">
      <ComponentePokemon
        :nombre="arreglo[0]"
        :id="arregloID[0]"
        :muestraPokemon="iniciarImg"
      ></ComponentePokemon>
      <ComponentePokemon
        :nombre="arreglo[1]"
        :id="arregloID[1]"
        :muestraPokemon="iniciarImg"
      ></ComponentePokemon>
      <ComponentePokemon
        :nombre="arreglo[2]"
        :id="arregloID[2]"
        :muestraPokemon="iniciarImg"
      ></ComponentePokemon>
    </div>
    <div>
      <button @click="jugarMetodo()">Jugar</button>
    </div>
  </div>
  <div :class="ganar" v-if="finJuego">
    <label v-text="resultado"></label>
    <label v-text="premio"></label>
    <button @click="reiniciar()">Nuevo juego</button>
  </div>
</template>

<script>
import ComponentePokemon from "./ComponentePokemon.vue";
import pokemonListafachada from "../helpers/pokemonAPI.js";
export default {
  data() {
    return {
      arregloC: null,
      arreglo: [],
      arregloID: [],
      iniciarImg: false,
      intentos: 0,
      puntaje: 0,
      resultado: "",
      finJuego: false,
      premio: "",
      gana: false,
    };
  },
  components: {
    ComponentePokemon,
  },
  methods: {
    async cargaJuegoInicial() {
      const arregloPokemons = await pokemonListafachada();
      this.arregloC = arregloPokemons;
      this.listaAletoria();
    },
    listaAletoria() {
      const lista = [];
      const lista2 = [];
      for (let index = 0; index < 3; index++) {
        let obj =
          this.arregloC[
            Math.floor(Math.random() * (this.arregloC.length - 1) + 1)
          ];
        lista.push(obj.nombre);
        lista2.push(obj.id);
      }
      this.arreglo = lista;
      this.arregloID = lista2;
    },
    async jugarMetodo() {
      if (this.intentos < 5) {
        this.listaAletoria();
        this.intentos++;
        this.comprobar();
        this.iniciarImg = true;
      } else {
        this.obtenerResultado();
      }
    },
    async reiniciar() {
      this.arregloC = null;
      await this.cargaJuegoInicial();
      this.iniciarImg = false;
      this.finJuego = false;
      this.intentos = 0;
      this.puntaje = 0;
    },
    comprobar() {
      if (
        this.arregloID[0] == this.arregloID[1] &&
        this.arregloID[0] == this.arregloID[2]
      ) {
        this.puntaje = this.puntaje + 5;
      } else if (
        this.arregloID[0] == this.arregloID[1] ||
        this.arregloID[0] == this.arregloID[2] ||
        this.arregloID[1] == this.arregloID[2]
      ) {
        this.puntaje = this.puntaje + 2;
      }
      console.log(this.puntaje);
    },
    obtenerResultado() {
      this.finJuego = true;
      if (this.puntaje >= 10) {
        this.gana = true;
        this.resultado = "Puntaje: " + this.puntaje;
        this.premio = "Felicitaciones has ganado un premio de $10.000,00";
      } else {
        this.gana = false;
        this.resultado = "Haz utilizado tus 5 intentos";
        this.premio = "El juego ha termindo, intentalo nuevamente";
      }
    },
  },
  mounted() {
    console.log("Se montó el componente.");
    this.cargaJuegoInicial();
  },
  computed: {
    ganar() {
      if (this.gana) {
        return "ganar";
      } else {
        return "perder";
      }
    },
  },
};
</script>

<style scoped>
.contenedor-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.ganar {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: blue;
}
.perder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: red;
}
label {
  font-weight: bold;
  margin: 10px;
}
button {
  border: 2px solid black;
}
button:hover {
  background-color: aqua;
}
</style>