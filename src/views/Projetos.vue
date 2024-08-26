<template>

    <section class="projetos">
        <h1 class="title">Projetos:</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label title">Nome do Projeto</label>
                <input type="text" class="input input-formulario" v-model="nomeDoProjeto" id="nomeDoProjeto" placeholder="Digite o nome do Projeto">
            </div>
            <div class="field">
                <button class="button is-white" type="submit">Salvar</button>
            </div>
        </form>
        <table class="table is-fullwidth tabela-projetos">
            <thead>
                <tr>
                    <th class="texto-da-tabela">ID</th>
                    <th class="texto-da-tabela">Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td class="texto-da-tabela">{{ projeto.id }}</td>
                    <td class="texto-da-tabela">{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>

</template>

<script lang="ts">

import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'ProjetoS',
    data() {
        return {
            nomeDoProjeto: '',
            
        }
    },
    setup(){
        const store = useStore()
        return {
            store,
            projetos: computed(()=> store.state.projetos)
        }
    },
    methods: {
        salvar() {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
        }
    }
})
</script>

<style scoped>
.title{
    color: var(--cor-primaria);
}
.projetos {
    padding: 2rem;
}
.input-formulario{
    background: #fff;
    color: #000;
}
.input-formulario::placeholder{
    color: #000;
}
.tabela-projetos{
    background: #fff;
    margin-top: 1em;
}
.texto-da-tabela{
    color: #000;
    
}
</style>