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
import { useStore } from '@/store';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipos-acoes';
import { computed, defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormularioProjetos',
    props: {
        id: { type: String }
    },
    setup(props) {
        const store = useStore()
        const { notificar } = useNotificador()
        const nomeDoProjeto = ref('')
        const router = useRouter()

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ''
        }
        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, { nome: nomeDoProjeto, id: props.id })
                    .then(() => {
                        lidarComSucesso('Atenção', 'O projeto foi alterado com sucesso', TipoDeNotificacao.ATENCAO)
                    })
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto)
                    .then(() => {
                        lidarComSucesso('Sucesso', 'O projeto foi adicionado com sucesso :)', TipoDeNotificacao.SUCESSO)
                    })
            }
        }
        const lidarComSucesso = (titulo: string, texto: string, tipo: TipoDeNotificacao) => {
            notificar(tipo, titulo, texto)
            nomeDoProjeto.value = ''
            router.push('/projetos')
        }
        return {
            nomeDoProjeto,
            salvar
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