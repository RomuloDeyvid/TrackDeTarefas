<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from './Box.vue';
import { useStore } from '@/store';
import { REMOVE_TAREFA } from '@/store/tipos-multacoes';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
    name: 'TarefaFormulario',
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true }
    },
    components: { Cronometro, Box },
    setup(){
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            tarefas: computed(() => store.state.tarefas),
            notificar
        }
    },
    methods: {
        excluir(id: string){
            this.store.commit(REMOVE_TAREFA, id)
            this.notificar(TipoDeNotificacao.FALHA, 'Atenção', 'A tarefa selecionada foi excluida')
        }
    }
})
</script>

<template>
    <Box class="box">
        <div class="columns">
            <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descricão' }}</div>
            <div class="column is-3"> {{ tarefa.projeto?.nome || 'N/D' }}</div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <div class="column">
                <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>
</template>

<style scoped>

</style>