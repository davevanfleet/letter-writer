import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

class Territory extends Component {
    state = {
        territory: '',
        contacts: []
    }

    componentDidMount(){
        const filterContacts = (polygon) => {
            fetch('http://localhost:8080/contacts')
                .then(r => r.json())
                .then(d => {
                    const filteredList = d.filter(contact => {
                        console.log(contact)
                        const coords = new this.props.google.maps.LatLng({lat: contact.lat, lng: contact.lng})
                        if (this.props.google.maps.geometry.poly.containsLocation(coords, polygon)){
                            return  true
                        } else {
                            return false
                                }
                        })
                    this.setState({
                        contacts: filteredList
                    })
                })
        }

        fetch('http://localhost:8080/territories/3')
                .then(r => r.json())
                .then(d => {
                    const territory = new this.props.google.maps.Polygon({paths: d.points})
                    this.setState({
                        territory: territory
                    })
                    filterContacts(territory)
                })
        

    }

    render(){
        const contacts = this.state.contacts.map(contact => <tr key={contact.id}><td>{contact.name}</td><td>{contact.address}</td><td>{contact.phone}</td></tr>)
        return(
            <div>
                <table>
                    <tr>
                        <th>Name:</th>
                        <th>Address:</th>
                        <th>Phone:</th>
                        <th>Check When Done:</th>
                    </tr>
                    { contacts }
                </table>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
})(Territory)