import { TipoDeNotificacao } from "@/interfaces/INotificacao"
import { NOTIFICAR } from "@/store/tipos-multacoes"
import { store } from '@/store'

export const notificacaoMixin = {
    methods: {
        notificar( titulo: string, texto: string, tipo: TipoDeNotificacao){
            store.commit(NOTIFICAR, {
                titulo, 
                texto, 
                tipo 
            })
        }
    }
}