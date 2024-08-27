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
        
    </section>

</template>

<script lang="ts">

import { useStore } from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FormularioProjetos',
    data() {
        return {
            nomeDoProjeto: '',
            
        }
    },
    setup(){
        const store = useStore()
        return {
            store
        }
    },
    methods: {
        salvar() {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
            this.$router.push('/projetos')

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