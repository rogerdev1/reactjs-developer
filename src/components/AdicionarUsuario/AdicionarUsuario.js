import React, { Component } from 'react'

import './AdicionarUsuario.css'

const INICIAL_STATE = {
  usuario: { nome: '', sobrenome: '', email: '' }
}

class AdicionarUsuario extends Component {

  constructor(props) {
    super(props)

    this.state = INICIAL_STATE

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(event) {
    const { name, value } = event.target
    this.setState({ usuario: { ...this.state.usuario, [name]: value } })
  }

  onSubmitHandler(event) {
    event.preventDefault()

    const usuario = this.state.usuario

    let url ='https://reqres.in/api/users?page=2'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    }).then( resposta => resposta.json())
      .then( dados => {
        console.log(dados)
        this.setState(INICIAL_STATE)
        this.props.adicionarUsuario(dados)
      })


    // const id = Math.floor(Math.random() * 1000)
    // const usuario = { ...this.state.usuario, id }

  }

  render() {

    return (
      <div className="AdicionarUsuario">
        <h2>Adicionar Usuário</h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="Linha">
            <div className="Coluna">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={this.state.usuario.nome}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
            <div className="Coluna">
              <label>Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                value={this.state.usuario.sobrenome}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
          </div>
          <div className="Linha">
            <div className="Coluna">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.usuario.email}
                onChange={this.onChangeHandler}
                required>
              </input>
            </div>
          </div>
          <button type="submit">
            Adicionar
        </button>
        </form>
      </div>
    )
  }
}
export default AdicionarUsuario
