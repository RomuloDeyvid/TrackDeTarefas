import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipos-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA, NOTIFICAR } from "@/store/tipos-multacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas
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
        }
    },
    actions: {
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
}