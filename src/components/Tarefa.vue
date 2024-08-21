<script lang="ts">
import { PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './Box.vue';

export default {
    name: 'TarefaFormulario',
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true }
    },
    components: { Cronometro, Box}
}
</script>

<template>
    <Box>
        <div class="columns">
            <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descricão' }}</div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<style scoped>
.box {
    color: black;
    background: teal;
}
</style>