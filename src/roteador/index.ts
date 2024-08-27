import Projetos from "@/views/Projetos.vue"
import FormularioProjetos from "@/views/Projetos/FormularioProjetos.vue"
import Tarefas from "@/views/Tarefas.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefa',
    component: Tarefas
},
{
    path: '/projetos',
    name: 'Projetos',
    component: Projetos
},
{
    path: '/projetos/novo',
    name: 'Novo projetos',
    component: FormularioProjetos
},
{
    path: '/projetos/:id',
    name: 'Editar projeto',
    component: FormularioProjetos
}]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador