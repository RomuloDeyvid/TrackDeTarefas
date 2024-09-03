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

import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO} from '@/store/tipos-multacoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'FormularioProjetos',
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    mixins: [notificacaoMixin],
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
            store,
            notificacoes: computed(() => store.state.notificacoes)
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, { nome: this.nomeDoProjeto, id: this.id })
                this.notificar('Atenção', 'O projeto foi alterado com sucesso', TipoDeNotificacao.ATENCAO)
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)   
                this.notificar('Sucesso', 'O projeto foi adicionado com sucesso :)', TipoDeNotificacao.SUCESSO)
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