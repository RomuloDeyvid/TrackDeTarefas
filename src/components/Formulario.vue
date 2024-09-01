<script lang="ts">
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key, store } from '@/store';
import { NOTIFICAR } from '@/store/tipos-multacoes';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';


export default defineComponent({

    name: 'FormularioInput',
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    setup() {
        const store = useStore(key)
        return {
            store,
            projetos: computed(() => store.state.projetos),
            notificacoes: computed(() => store.state.notificacoes)
        }
    },
    components: { Temporizador },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {

            if (this.idProjeto) {
                this.$emit('aoSalvarTarefa', {
                    duracaoEmSegundos: tempoDecorrido,
                    descricao: this.descricao,
                    projeto: this.projetos.find(proj => proj.id == this.idProjeto)
                })

                this.descricao = ''
            } else {
                this.store.commit(NOTIFICAR, { titulo: 'Atenção', texto: 'Adicione o tipo de Projeto para finalizar a tarefa', tipo: TipoDeNotificacao.ATENCAO })
            }
        }
    },
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