import { TipoDeNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipos-multacoes"

type Notificador = {
    notificar: (tipo: TipoDeNotificacao, titulo: string, texto: string) => void
}

export default () : Notificador => {
    const notificar = (tipo: TipoDeNotificacao, titulo: string, texto: string) : void  => {
        store.commit(NOTIFICAR, {
            tipo,
            titulo, 
            texto
        })
    }
    return { notificar }
}