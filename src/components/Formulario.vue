<script lang="ts">
export default {
    name: 'FormularioInput', 
    data(){
        return {
            tempoEmSegundos: 0,
            cronometro: 0 
        }
    },
    computed: {
        tempoDecorrido(): string{
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
        }
    },
    methods: {
        iniciar(){
            this.cronometro = setInterval(()=>{
                this.tempoEmSegundos++
            }, 1000)
        },
        finalizar(){
            clearInterval(this.cronometro)
        }
    }
}
</script>

<template>
    <div class="box">

        <div class="columns">

            <div class="column is-8" role="form" aria-label="Formulario para criacao de uma tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?">
            </div>

            <div class="column is-flex is-align-items-center is-justify-content-space-between">

                <section>
                    <strong>{{ tempoDecorrido }}</strong>
                </section>

                <button class="button" @click="iniciar">
                    <span class="icon">
                        <i class="fas fa-play"></i>
                    </span>
                    <span>Play</span>

                </button>

                <button class="button" @click="finalizar">
                    <span class="icon">
                        <i class="fas fa-stop"></i>
                    </span>
                    <span>Stop</span>

                </button>

            </div>

        </div>

    </div>
</template>