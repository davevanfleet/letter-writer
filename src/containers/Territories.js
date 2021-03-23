import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useJsApiLoader, GoogleMap, Polygon } from '@react-google-maps/api';
import { config } from '../constants';
import uuid from 'uuid';
import Territory from '../components/Territory';

const Territories = (props) => {

    const [ territoryId, setTerritoryId ] = useState(0)
    const [ territoryName, setTerritoryName ] = useState('')
    const [ territories, setTerritories ] = useState([])
    const [ path, setPath ] = useState([])
    const [ contacts, setContacts ] = useState([])
    const [ contactsLoaded, setContactsLoaded ] = useState(false)

    const handleUpdateMap = (e) => {
        e.preventDefault()
        debugger
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const polygonRef = useRef(null);
    const listenersRef = useRef([]);

    // Call setPath with new edited path
    const onEdit = useCallback(() => {
        if (polygonRef.current) {
            const nextPath = polygonRef.current
            .getPath()
            .getArray()
            .map(latLng => {
                return { lat: latLng.lat(), lng: latLng.lng() };
            });
        setPath(nextPath);
      }
    }, [setPath]);

    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(
        polygon => {
            polygonRef.current = polygon;
            const path = polygon.getPath();
            listenersRef.current.push(
                path.addListener("set_at", onEdit),
                path.addListener("insert_at", onEdit),
                path.addListener("remove_at", onEdit)
            );
        }, [onEdit]);

    // Clean up refs
    const onUnmount = useCallback(() => {
        listenersRef.current.forEach(lis => lis.remove());
        polygonRef.current = null;
    }, []);

    useEffect(() => {
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/territories`)
            .then(r => r.json())
            .then(data => {
                setTerritories(data)
            })
    }, [])

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
            fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/contacts`)
                .then(r => r.json())
                .then(d => {
                    const filteredList = d.filter(contact => {
                        const coords = new window.google.maps.LatLng({lat: contact.lat, lng: contact.lng})
                        return window.google.maps.geometry.poly.containsLocation(coords, polygon)
                    })
                    setContacts(filteredList)
                    setContactsLoaded(true)
                })
        }

        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/territories/${e.target.value}`)
                .then(r => r.json())
                .then(d => {
                    polygonRef.current = new window.google.maps.Polygon({paths: d.points})
                    setTerritoryName(d.name)
                    filterContacts(polygonRef.current)
                    setPath(d.points)
                })
    }
        
    const territoryOptions = territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.id}>{t.name}</option>)
        
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    return (
        <div>
            <h3>Select a Territory</h3>
            <select name="territoryId" onChange={handleChange} value={territoryId}>
                <option key={uuid()} value="0">Select a Territory</option>
                {territoryOptions}
            </select>
            {contactsLoaded ? 
            <>
                <button onClick={handleUpdateMap} className="btn btn-warning">Update Borders</button>
                {isLoaded && 
                    <GoogleMap zoom={14}
                               mapContainerStyle={containerStyle}
                               center={getCenter(path)}>
                        <Polygon ref={polygonRef}
                                 paths={path}
                                 strokeColor="#0000FF"
                                 strokeOpacity={0.8}
                                 strokeWeight={2}
                                 fillColor="#0000FF"
                                 fillOpacity={0.35}
                                 editable
                                 onMouseUp={onEdit}
                                 onLoad={onLoad}
                                 onUnmount={onUnmount}/>
                    </GoogleMap>
                }
                <Territory contacts={contacts}
                           name={territoryName}
                           territoryId={territoryId}
                           currentUser={props.currentUser} />
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

export default Territories