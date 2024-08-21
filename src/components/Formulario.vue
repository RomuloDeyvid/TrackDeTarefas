<script lang="ts">
import Temporizador from './Temporizador.vue';



export default {
  
    name: 'FormularioInput',
    data (){
        return {
            descricao: ''
        }
    },
    components: { Temporizador},
    methods: {
        finalizarTarefa(tempoDecorrido : number) : void{
            this.$emit('aoSalvarTarefa', {duracaoEmSegundos: tempoDecorrido, descricao: this.descricao} )
            this.descricao = ''
        }
    },
    emits: ['aoSalvarTarefa']
    }
</script>

<template>
    <div class="box">

        <div class="columns">

            <div class="column is-8" role="form" aria-label="Formulario para criacao de uma tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>

            <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            
        </div>

    </div>
</template>