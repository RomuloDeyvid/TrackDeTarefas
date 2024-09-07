import { INotificacao } from "@/interfaces/INotificacao";
import { Estado } from "@/store";
import { NOTIFICAR } from "@/store/tipos-multacoes";
import { Module } from "vuex";

export interface EstadoNotifica {
    notificacoes: INotificacao[]
}

export const notificar: Module<EstadoNotifica, Estado> = {
    state: {
        notificacoes: []
    },
    mutations: {
        [NOTIFICAR](state, novaNotificao: INotificacao){
            novaNotificao.id = new Date().getTime()
            state.notificacoes.push(novaNotificao)
            setTimeout(() => state.notificacoes = state.notificacoes.filter( notificao => notificao.id != novaNotificao.id ), 3000)
        }
    }
}