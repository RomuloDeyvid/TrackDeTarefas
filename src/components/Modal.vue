<template>
    <div :class="['modal', { 'is-active': mostrar }]" v-if="mostrar">
        <div class="modal-background" @click="fecharModal">
            <div class="modal-card">
                <header class="modal-card-head">
                    <slot name="cabecalho"></slot>
                </header>
                <section class="modal-card-body">
                    <slot name="corpo"></slot>
                </section>
                <footer class="modal-card-foot">
                    <slot name="rodape"></slot>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'ModaL',
    props: {
        mostrar: { type: Boolean, required: true }
    }
})
</script>