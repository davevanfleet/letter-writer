import React, { useState, useRef, useCallback } from 'react';
import { useJsApiLoader, GoogleMap, DrawingManager, Polygon } from '@react-google-maps/api';

const NewTerritory = (props) => {
    const [ finished, setFinished ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ path, setPath ] = useState([])

    const [ name, setName ] = useState('')
    const handleNameChange = e => {
        setName(e.target.value)
    }

    const { isLoaded } = useJsApiLoader({
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
    
    const handlePolygonComplete = useCallback((polygon) => {
        polygonRef.current = polygon
        if (polygonRef.current) {
            const nextPath = polygonRef.current
            .getPath()
            .getArray()
            .map(latLng => {
                return { lat: latLng.lat(), lng: latLng.lng() };
            });
        setPath(nextPath);
        setFinished(true);
      }
    }, [setPath]);

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
                    {finished ? 
                        <Polygon ref={polygonRef}
                                 paths={path}
                                 strokeColor="#0000FF"
                                 strokeOpacity={0.8}
                                 strokeWeight={2}
                                 fillColor="#0000FF"
                                 fillOpacity={0.35}
                                 onMouseUp={onEdit}
                                 onLoad={onLoad}
                                 onUnmount={onUnmount}
                                 editable={edit}
                                 options={{fillColor: "purple"}}/>
                        :
                        <DrawingManager drawingMode="polygon"
                                        onPolygonComplete={handlePolygonComplete} />
                    }
                </GoogleMap>}
        </div>
    )
}

export default NewTerritory;