<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'BarraLateral',
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  emits: ['aoTemaAlterado'],
  methods: {
    alterarOTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  },
  computed: {
    textoDoBotao() {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro!'
      }else {
        return 'Ativar modo escuro!'
      }
    }
  }
})

</script>

<template>

  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button is-white" @click="alterarOTema">{{ textoDoBotao}}</button>
  </header>

</template>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>