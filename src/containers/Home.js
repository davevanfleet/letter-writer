import React, { Component } from 'react';
import Territory from '../components/Territory';
import {GoogleApiWrapper} from 'google-maps-react';
import { config } from '../constants';
import uuid from 'uuid';

class Home extends Component {
    state = {
        territoryId: 0,
        territoryName: '',
        territories: [],
        territory: '',
        contacts: []
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
            [e.target.name]: e.target.value
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
                        contacts: filteredList
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
        const territories = this.state.territories.map(t => <option key={uuid()} value={t.id}>{t.name}</option>)
        return(
            <div>
                <h3>Select a Territory</h3>
                <form onSubmit={this.handleSubmit}>
                    <select name="territoryId" onChange={this.handleChange} value={this.state.territoryId}>
                        <option key={uuid()} value="0">Select a Territory</option>
                        {territories}
                    </select>
                </form>
                {this.state.territoryId > 0 ? <Territory contacts={this.state.contacts} name={this.state.territoryName} /> : null}
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
})(Home)