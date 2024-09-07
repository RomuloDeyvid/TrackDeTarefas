import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";
import { EstadoNotifica, notificar } from "./modulos/notifica";

export interface Estado {
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa,
    notificar: EstadoNotifica
}

export const store = createStore<Estado>({
    state: {
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        },
        notificar: {
            notificacoes: []
        }
    },
    modules:{
        projeto,
        tarefa,
        notificar
    }
})

export const key: InjectionKey<Store<Estado>> = Symbol()

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}