<template>

    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo Projeto</span>
        </router-link>

        <table class="table is-fullwidth tabela-projetos">
            <thead>
                <tr>
                    <th class="texto-da-tabela">ID</th>
                    <th class="texto-da-tabela">Nome</th>
                    <th class="texto-da-tabela">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td class="texto-da-tabela">{{ projeto.id }}</td>
                    <td class="texto-da-tabela">{{ projeto.nome }}</td>
                    <td class="texto-da-tabela">
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>

</template>

<script lang="ts">

import { useStore } from '@/store';
import { EXCLUIR_PROJETO } from '@/store/tipos-multacoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'ListaDeProjetos',
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    },
    methods: {
        excluir(id: string) {
            this.store.commit(EXCLUIR_PROJETO, id)
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