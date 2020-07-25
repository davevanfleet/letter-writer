import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {GoogleApiWrapper} from 'google-maps-react';
import { config } from '../constants';
import uuid from 'uuid';
import Territory from '../components/Territory';

class Territories extends Component {
    state = {
        territoryId: 0,
        territoryName: '',
        territories: [],
        territory: '',
        contacts: [],
        contactsLoaded: false
    }

    componentDidMount(){
        fetch(`${config.url.API_URL}/territories`)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    territories: data
                })
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            contactsLoaded: false
        })

        const filterContacts = (polygon) => {
            fetch(`${config.url.API_URL}/contacts`)
                .then(r => r.json())
                .then(d => {
                    const filteredList = d.filter(contact => {
                        const coords = new this.props.google.maps.LatLng({lat: contact.lat, lng: contact.lng})
                        return this.props.google.maps.geometry.poly.containsLocation(coords, polygon)
                    })
                    this.setState({
                        contacts: filteredList,
                        contactsLoaded: true
                    })
                })
        }

        fetch(`${config.url.API_URL}/territories/${e.target.value}`)
                .then(r => r.json())
                .then(d => {
                    const territory = new this.props.google.maps.Polygon({paths: d.points})
                    this.setState({
                        territory: territory,
                        territoryName: d.name
                    })
                    filterContacts(territory)
                })
    }

    render(){
        const territories = this.state.territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.id}>{t.name}</option>)
        return(
            <div>
                <h3>Select a Territory</h3>
                <select name="territoryId" onChange={this.handleChange} value={this.state.territoryId}>
                    <option key={uuid()} value="0">Select a Territory</option>
                    {territories}
                </select>
                {this.state.contactsLoaded ? <Territory contacts={this.state.contacts} name={this.state.territoryName} /> : (this.state.territoryId > 0 ? <FontAwesomeIcon icon={faSpinner} size="6x" spin /> : null)}
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
})(Territories)