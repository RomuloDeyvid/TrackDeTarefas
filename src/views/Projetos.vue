<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'ProjetoS'
})
</script>

<style>
.projetos {
    padding: 2rem;
}
</style>