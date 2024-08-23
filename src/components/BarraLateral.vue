<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'BarraLateral',
  data() {
    return {
      modoEscuroAtivo: false, 
      logoBranca: '../assets/logo-branca.jpg'
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
      <img src="../assets/logo-preta.jpg" alt="">
    </h1>
    <br>
    <div class="has-text-centered">
    <button class="button is-white" @click="alterarOTema">{{ textoDoBotao }}</button>
    </div>
    <nav class="mt-5 ">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>

</template>

<style scoped>
header {
  padding: 1rem;
  background: #12252B;
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
.panel li {
  margin: 8px 0;
}
.link{
  color: #fff;
}
.link:hover{
  color: #FAF0CA;
}
.link.router-link-active{
  color: #F8C420;
}
</style>