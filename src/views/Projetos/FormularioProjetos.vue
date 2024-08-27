<template>

    <section>
        
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
    props:{
        id: { type: String}
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find( proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
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
            if (this.id) {
                this.store.commit('ALTERA_PROJETO', { nome: this.nomeDoProjeto, id: this.id })
            } else {
                this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)   
            }
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