<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from './Box.vue';
import { useStore } from '@/store';

import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { REMOVER_TAREFA } from '@/store/tipos-acoes';

export default defineComponent({
    name: 'TarefaFormulario',
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true }
    },
    components: { Cronometro, Box },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            tarefas: computed(() => store.state.tarefas),
            notificar
        }
    },
    methods: {
        excluir() {
            this.store.dispatch(REMOVER_TAREFA, this.tarefa)
            this.notificar(TipoDeNotificacao.FALHA, 'Atenção', 'A tarefa selecionada foi excluida')
        },
        tarefaClicada(): void{
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    },
    emits: [ 'aoTarefaClicada']
})
</script>

<template>
    <Box class="box clicavel">
        <div class="columns">
            <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descricão' }}</div>
            <div class="column is-3"> {{ tarefa.projeto?.nome || 'N/D' }}</div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <div class="column">
                <button class="button ml-2" @click="tarefaClicada">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                </button>
                <button class="button ml-2 is-danger" @click="excluir()">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>
</template>

<style scoped>
.clicavel{
    cursor: pointer;
}
</style>