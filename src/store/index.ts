import IProjeto from "@/components/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface Estado {
    projetos: IProjeto[]
}

export const store = createStore<Estado>({
    state: {
        projetos: [{
            id: new Date().toISOString(),
            nome: 'TypeScript'
        },
        {
            id: new Date().toISOString(),
            nome: 'Vue'
        },
        {
            id: new Date().toISOString(),
            nome: 'VueX'
        }]
    }
})

export const key: InjectionKey<Store<Estado>> = Symbol()