import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class CheckBox extends Component {
    state = {
        display: false
    }

    handleClick = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {display: !prevState.display}
        })
    }

    render(){
        return(
            <td id={`contact-${this.props.id}`} onClick={(e) => this.handleClick(e)}>
                {this.state.display ? <FontAwesomeIcon icon={faCheck} /> : null}
            </td>
        )
    }
}