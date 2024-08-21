<script lang="ts">
import { defineComponent } from 'vue';
import BotaoTemporizador from './BotaoTemporizador.vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
  components: { Cronometro, BotaoTemporizador },
    name: 'TemporizadorCronometro', 
    data(){
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar(){
            this.cronometroRodando = true
            this.cronometro = setInterval(()=>{
                this.tempoEmSegundos++
            }, 1000)
        },
        finalizar(){
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }, 
    emits: ['aoTemporizadorFinalizado']
})
</script>
<template>
    <div class="column is-flex is-align-items-center is-justify-content-space-between">

<Cronometro :tempoEmSegundos="tempoEmSegundos"/>

<BotaoTemporizador :texto="'Play'" :icone="'fa-play'" :cronometroRodando="cronometroRodando" @clicado="iniciar" />
<BotaoTemporizador :texto="'Stop'" :icone="'fa-stop'" :cronometroRodando="!cronometroRodando" @clicado="finalizar" />


</div>
</template>