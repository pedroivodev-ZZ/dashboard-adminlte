function searchInTelas(telas, telaFilha) {
    for (const i in telas) {
        if (!telas[i].telas) {
            telas[i].telas = []
        }

        if (telaFilha.fk_id_tela == telas[i].id) {
            telas[i].telas.push(telaFilha)
            return true
        }

        if (telas[i].telas.length > 0) {
            if (searchInTelas(telas[i].telas, telaFilha)) {
                return true
            }
        }
    }

    return false
}

function getListaAtualizada(lista, itensExcluir) {
    return lista.filter((item) => {
        return itensExcluir.indexOf(item.id) == -1
    })
}

function getTelasAsTree(telas) {
    let idTelasAchadas = []

    //obtem as telas na raiz 
    let telasAsTree = telas.filter((tela, indice) => {
        if (!tela.fk_id_tela) {
            idTelasAchadas.push(tela.id)
            return true
        }

        return false
    })

    //atualiza a lista de telas que precisam ser adicionadas na árvore
    let telasRestantes = getListaAtualizada(telas, idTelasAchadas)

    let i = 0
    while (telasRestantes.length != 0) {
        if (i == telasRestantes.length) {
            i = 0
        }

        //caso localize a tela mãe, aloca o elemento na árvore
        if (searchInTelas(telasAsTree, telasRestantes[i])) {
            //atualiza a lista de telas que já foram alocadas na árvore e também a das que faltam
            idTelasAchadas.push(telasRestantes[i].id)
            telasRestantes = getListaAtualizada(telasRestantes, idTelasAchadas)

            //atualiza o índice para retomar a busca do início no próximo elemento das telas que faltam
            i = 0
        } else {
            //caso não localize a tela mãe, muda o índice para tentar alocar outro elemento
            i++
        }
    }

    return telasAsTree
}

module.exports = {
    getTelasAsTree
}