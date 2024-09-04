<template>

  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarOTema"/>
    </div>

    <div class="box column is-three-quarter conteudo">
      <Notificacoes />
      <router-view/>

    </div>

  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';



export default defineComponent({
  name: 'App',
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  components: { BarraLateral, Notificacoes },
  methods: {
    trocarOTema(modoEscuroAtivo : boolean){
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }

});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro{
  --bg-primario: #2b2d42;
  --texto-primario: #fff;
}
.conteudo{
  background-color: var(--bg-primario);
}
</style>
