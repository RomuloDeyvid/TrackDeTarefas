<template>

    <section>

        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label title">Nome do Projeto</label>
                <input type="text" class="input input-formulario" v-model="nomeDoProjeto" id="nomeDoProjeto"
                    placeholder="Digite o nome do Projeto">
            </div>
            <div class="field">
                <button class="button is-white" type="submit">Salvar</button>
            </div>
        </form>

    </section>

</template>

<script lang="ts">

import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipos-acoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'FormularioProjetos',
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    mixins: [notificacaoMixin],
    props: {
        id: { type: String }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            notificacoes: computed(() => store.state.notificar.notificacoes)
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, { nome: this.nomeDoProjeto, id: this.id })
                .then(() => {
                    this.lidarComSucesso('Atenção', 'O projeto foi alterado com sucesso', TipoDeNotificacao.ATENCAO)
                })
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => {
                        this.lidarComSucesso('Sucesso', 'O projeto foi adicionado com sucesso :)', TipoDeNotificacao.SUCESSO)
                    })
            }
        },
        lidarComSucesso(titulo: string, texto: string, tipo: TipoDeNotificacao) {
            this.notificar(titulo, texto, tipo)
            this.nomeDoProjeto = ''
            this.$router.push('/projetos')
        }
    }
})
</script>

<style scoped>
.title {
    color: var(--cor-primaria);
}

.input-formulario {
    background: #fff;
    color: #000;
}

.input-formulario::placeholder {
    color: #000;
}

.tabela-projetos {
    background: #fff;
    margin-top: 1em;
}

.texto-da-tabela {
    color: #000;

}
</style>