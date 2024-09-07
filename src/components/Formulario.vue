<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import useNotificador from "@/hooks/notificador"

export default defineComponent({

    name: 'FormularioInput',
    setup(props, {emit}) {
        const descricao = ref('')
        const idProjeto = ref('')
        const store = useStore(key)
        const { notificar } = useNotificador()
        const projetos = computed(() => store.state.projeto.projetos)
        const finalizarTarefa = (tempoDecorrido: number): void => {
            if (idProjeto.value) {
                emit('aoSalvarTarefa', {
                    duracaoEmSegundos: tempoDecorrido,
                    descricao: descricao.value,
                    projeto: projetos.value.find(proj => proj.id == idProjeto.value)
                })
                descricao.value = ''
            } else {
                notificar(TipoDeNotificacao.ATENCAO, 'Atenção', 'Adicione o tipo de Projeto para finalizar a tarefa')
            }
        }
        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa
        }
    },
    components: { Temporizador },
    emits: ['aoSalvarTarefa']
})
</script>

<template>
    <div class="box formulario">

        <div class="columns">

            <div class="column is-5" role="form" aria-label="Formulario para criacao de uma tarefa">
                <input type="text" class="input input-tarefa " placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao">
            </div>

            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>

            <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />

        </div>

    </div>
</template>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);

}

.input-tarefa {
    background: #fff;
    color: #000;
}

.input-tarefa::placeholder {
    color: black;
}
</style>