import React, { Component } from 'react'

class ComponentCustom extends Component {
    set(nomeCampo, event) {
        let state =  {}
        state[nomeCampo] = event.target.value
        this.setState(state)
    }
}

export default ComponentCustom