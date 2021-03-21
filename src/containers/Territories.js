import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Map, Polygon, GoogleApiWrapper} from 'google-maps-react';
import { config } from '../constants';
import uuid from 'uuid';
import Territory from '../components/Territory';

const Territories = (props) => {
    // state = {
    //     territoryId: 0,
    //     territoryName: '',
    //     territories: [],
    //     path: [],
    //     contacts: [],
    //     contactsLoaded: false,
    // }

    const [ territoryId, setTerritoryId ] = useState(0)
    const [ territoryName, setTerritoryName ] = useState('')
    const [ territories, setTerritories ] = useState([])
    const [ path, setPath ] = useState([])
    const [ contacts, setContacts ] = useState([])
    const [ contactsLoaded, setContactsLoaded ] = useState(false)

    useEffect(() => {
        fetch(`${config.url.API_URL}/territories`)
            .then(r => r.json())
            .then(data => {
                setTerritories(data)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const getCenter = (points) => {
        const lngCenter = points.reduce((sum, point) => {
            return sum + point.lng
        }, 0) / points.length

        const latCenter = points.reduce((sum, point) => {
            return sum + point.lat
        }, 0) / points.length

        return {lng: lngCenter, lat: latCenter}
    }

    const handleChange = (e) => {
        setTerritoryId(e.target.value)
        setContactsLoaded(false)

        const filterContacts = (polygon) => {
            fetch(`${config.url.API_URL}/contacts`)
                .then(r => r.json())
                .then(d => {
                    const filteredList = d.filter(contact => {
                        const coords = new props.google.maps.LatLng({lat: contact.lat, lng: contact.lng})
                        return props.google.maps.geometry.poly.containsLocation(coords, polygon)
                    })
                    setContacts(filteredList)
                    setContactsLoaded(true)
                })
        }

        fetch(`${config.url.API_URL}/territories/${e.target.value}`)
                .then(r => r.json())
                .then(d => {
                    const territory = new props.google.maps.Polygon({paths: d.points})
                    // setTerritory(territory)
                    setTerritoryName(d.name)
                    filterContacts(territory)
                    setPath(d.points)
                })
    }
        
    const territoryOptions = territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.id}>{t.name}</option>)
        
    return (
        <div>
            <h3>Select a Territory</h3>
            <select name="territoryId" onChange={handleChange} value={territoryId}>
                <option key={uuid()} value="0">Select a Territory</option>
                {territoryOptions}
            </select>
            {contactsLoaded ? 
            <>
                <Map google={props.google}
                     style={{width: '100%', height: "400px", position: 'relative'}}
                     className={'map'}
                     initialCenter={getCenter(path)}
                     zoom={14}>
                    <Polygon paths={path}
                             strokeColor="#0000FF"
                             strokeOpacity={0.8}
                             strokeWeight={2}
                             fillColor="#0000FF"
                             fillOpacity={0.35}
                             editable/>
                </Map>
                <Territory contacts={contacts}
                           name={territoryName}
                           territoryId={territoryId} />
            </>
            : 
            (territoryId > 0 ? 
                <>
                    <br /><br />
                    <FontAwesomeIcon icon={faSpinner} size="6x" spin />
                </> 
                :
                null)}
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
})(Territories)