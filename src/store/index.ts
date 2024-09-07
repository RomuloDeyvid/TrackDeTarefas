import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./tipos-multacoes";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO, REMOVER_TAREFA } from "./tipos-acoes";
import http from "@/http"

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
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
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tarefaDaVez => tarefaDaVez.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: number) {
            state.tarefas = state.tarefas.filter(tarefaDaVez => tarefaDaVez.id != id)
        },
        [NOTIFICAR](state, novaNotificao: INotificacao){
            novaNotificao.id = new Date().getTime()
            state.notificacoes.push(novaNotificao)

            setTimeout(() => state.notificacoes = state.notificacoes.filter( notificao => notificao.id != novaNotificao.id ), 3000)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos 
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        }
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }){
            http.get('projetos')
            .then(resposta => commit( DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto){
            return http.post('projetos', { 
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto ){
            return http.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO] ({ commit }, id: string ){
            return http.delete(`projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id))
        }, 
        [OBTER_TAREFAS]({ commit }){
            http.get('tarefas')
            .then(resposta => commit( DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa){
            return http.post('tarefas', tarefa)
            .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA] ({commit}, tarefa: ITarefa){
            return http.put(`tarefas/${tarefa.id}`, tarefa)
            .then(() => commit(ALTERA_TAREFA, tarefa))
        },
        [REMOVER_TAREFA] ({ commit }, tarefa: ITarefa ){
            return http.delete(`tarefas/${tarefa.id}`)
            .then(() => commit(EXCLUIR_TAREFA, tarefa.id))
        }
    }
})

export const key: InjectionKey<Store<Estado>> = Symbol()

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}