import React, { useState, useRef, useCallback } from 'react';
import { useLoadScript, GoogleMap, DrawingManager } from '@react-google-maps/api';


const NewTerritory = (props) => {
    const [ finished, setFinished ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ path, setPath ] = useState([])

    const [ name, setName ] = useState('')
    const handleNameChange = e => {
        setName(e.target.value)
    }

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['drawing']
    })

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

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

    const onLoad = drawingManager => {
        console.log(drawingManager)
    }

    const onPolygonComplete = polygon => {
        setFinished(true)
    }

    const containerStyle = {
        width: '100%',
        height: '800px'
    };

    const center = {
        lng: -72.23,
        lat: 41.72
      };

    return (
        <div id="new-territory">
            <h1>Add Territory</h1>
            <div className="input-row">
                <label htmlFor="territoryName">Territory Name:</label>
                <input type="text"
                   name="territoryName"
                   value={name}
                   onChange={handleNameChange} />
            </div>
            {isLoaded &&
                <GoogleMap mapContainerStyle={containerStyle}
                           center={center}
                           zoom={10}
                           onUnmount={onUnmount}>
                    <DrawingManager onLoad={onLoad}
                                    drawingMode={finished ? null : "polygon"}
                                    onPolygonComplete={onPolygonComplete}
                                    options={{
                                        drawingControl: false,
                                        polygonOptions: {
                                            fillColor: "#ffff00",
                                            fillOpacity: 0.25,
                                            strokeWeight: 1,
                                            clickable: false,
                                            editable: true,
                                            zIndex: 1,
                                          },
                                    }} />
                </GoogleMap>}
        </div>
    )
}

export default NewTerritory;