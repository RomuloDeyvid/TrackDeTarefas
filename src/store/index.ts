import IProjeto from "@/interfaces/IProjeto";
import Projetos from "@/views/Projetos.vue";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ATUALIZA_TAREFA, EXCLUIR_PROJETO, REMOVE_TAREFA } from "./tipos-multacoes";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao, TipoDeNotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [
            {
                titulo: 'Sucesso',
                texto: 'Uma notificação de sucesso',
                tipo: TipoDeNotificacao.SUCESSO,
                id: 1
            },
            {
                titulo: 'Atenção',
                texto: 'Uma notificação de atenção',
                tipo: TipoDeNotificacao.ATENCAO,
                id: 2
            },
            {
                titulo: 'Falha',
                texto: 'Uma notificação de falha',
                tipo: TipoDeNotificacao.FALHA,
                id: 3
            },
        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tarefaDaVez => tarefaDaVez.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [REMOVE_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(tarefaDaVez => tarefaDaVez.id != id)
        }
    }
})

export const key: InjectionKey<Store<Estado>> = Symbol()

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}