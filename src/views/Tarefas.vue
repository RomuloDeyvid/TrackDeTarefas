<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipos-acoes';


export default defineComponent({
  name: 'TarefaS',
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  components: { Formulario, Tarefa, Box },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    editarTarefa(){
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada )
      .then(this.fecharModal)
    }

  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    return {
      store,
      tarefas: computed(() => store.state.tarefas)
    }
  }

});
</script>

<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <Box v-if="listaEstaVazia">
      Você não tem tarefas realizadas!
    </Box>
  </div>
  <div :class="['modal', { 'is-active': tarefaSelecionada }]" v-if="tarefaSelecionada">
    <div class="modal-background" @click="fecharModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="nomeDaTarefa" class="label title">Nome do Tarefa</label>
          <input type="text" class="input input-formulario" v-model="tarefaSelecionada.descricao" id="nomeDaTarefa"
            placeholder="Digite o nome do Tarefa">
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-success" @click="editarTarefa()" >Salvar alterações</button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </div>
      </footer>
    </div>
  </div>

</template>
