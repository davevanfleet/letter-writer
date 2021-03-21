import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import { config } from '../constants';
import uuid from 'uuid';
import Territory from '../components/Territory';

class Territories extends Component {
    state = {
        territoryId: 0,
        territoryName: '',
        territories: [],
        path: [],
        contacts: [],
        contactsLoaded: false,
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

    getCenter = (points) => {
        const lngCenter = points.reduce((sum, point) => {
            return sum + point.lng
        }, 0) / points.length

        const latCenter = points.reduce((sum, point) => {
            return sum + point.lat
        }, 0) / points.length

        return {lng: lngCenter, lat: latCenter}
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
                    this.setState({
                        path: d.points
                    })
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
                {this.state.contactsLoaded ? 
                                            <>
                                                <Map google={this.props.google}
                                                     style={{width: '100%', height: "400px", position: 'relative'}}
                                                     className={'map'}
                                                     initialCenter={this.getCenter(this.state.path)}
                                                     zoom={14}>
                                                    <Polygon paths={this.state.path}
                                                             strokeColor="#0000FF"
                                                             strokeOpacity={0.8}
                                                             strokeWeight={2}
                                                             fillColor="#0000FF"
                                                             fillOpacity={0.35}/>
                                                </Map>
                                                <Territory contacts={this.state.contacts}
                                                           name={this.state.territoryName}
                                                           territoryId={this.state.territoryId} />
                                            </>
                                            : 
                                            (this.state.territoryId > 0 ? 
                                                <>
                                                    <br /><br />
                                                    <FontAwesomeIcon icon={faSpinner} size="6x" spin />
                                                </> 
                                                :
                                                null)}
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
})(Territories)