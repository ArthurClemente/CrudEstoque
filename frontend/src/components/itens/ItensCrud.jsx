import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'list-alt',
    title: 'Itens',
    subtitle: 'Cadastro de itens: Incluir, Listar, Alterar e Excluir.'
}

export default class ItensCrud extends Component {
    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Itens
            </Main>
        )
    }
}