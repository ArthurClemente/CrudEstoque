import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'list-alt',
    title: 'Itens',
}

const baseUrl = 'http://localhost:3001/itens'
const initialState = {
    itens: { nome: '', quantidade: '', valor: '' },
    list: []
}

export default class ItensCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ itens: initialState.itens })
    }

    save() {
        const itens = this.state.itens
        const method = itens.id ? 'put' : 'post'
        const url = itens.id ? `${baseUrl}/${itens.id}` : baseUrl
        axios[method](url, itens)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ itens: initialState.itens, list })
            })
    }

    getUpdatedList(itens, add = true) {
        const list = this.state.list.filter(i => i.id !== itens.id)
        if (add) list.unshift(itens)
        return list
    }

    updateField(event) {
        const itens = { ...this.state.itens }
        itens[event.target.name] = event.target.value
        this.setState({ itens })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.itens.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do item..." />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="text" className="form-control"
                                name="quantidade"
                                value={this.state.itens.quantidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe a quantidade..." />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Valor(R$)</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={this.state.itens.valor}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe o valor..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(itens) {
        this.setState({ itens })
    }

    remove(itens) {
        axios.delete(`${baseUrl}/${itens.id}`).then(resp => {
            const list = this.getUpdatedList(itens, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Valor(R$)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(itens => {
            return (
                <tr key={itens.id}>
                    <td>{itens.id}</td>
                    <td>{itens.nome}</td>
                    <td>{itens.quantidade}</td>
                    <td>{itens.valor}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(itens)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(itens)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}   