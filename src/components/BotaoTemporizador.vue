<script lang="ts">
export default {
    name: 'botaoTemporizador',
    props: {
        texto: { type: String, required: true},
        icone: { type: String, required: true},
        cronometroRodando: { type: Boolean, required: true}
    },
    methods: {
        clicado(){
            this.$emit('clicado')
        }
    },
    emits: ['clicado']
}
</script>

<template>

    <button class="button" @click="clicado" :disabled="cronometroRodando">

        <span class="icon">
            <i :class="['fas', icone ]"></i>
        </span>
        <span>{{ texto }}</span>

    </button>

</template>