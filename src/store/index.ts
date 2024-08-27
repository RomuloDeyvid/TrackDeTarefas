import IProjeto from "@/interfaces/IProjeto";
import Projetos from "@/views/Projetos.vue";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

interface Estado {
    projetos: IProjeto[]
}

export const store = createStore<Estado>({
    state: {
        projetos: [] 
    },
    mutations: {
        'ADICIONA_PROJETO'( state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        'ALTERA_PROJETO'(state, projeto: IProjeto){
            const index = state.projetos.findIndex( proj => proj.id == projeto.id  )
            state.projetos[index] = projeto
        }
    }
})

export const key: InjectionKey<Store<Estado>> = Symbol()

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}