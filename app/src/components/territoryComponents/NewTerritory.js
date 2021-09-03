import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLoadScript, GoogleMap, DrawingManager, StandaloneSearchBox } from '@react-google-maps/api';
import { useHistory } from 'react-router';
import { config } from '../../constants';


const NewTerritory = (props) => {
    const [ finished, setFinished ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ path, setPath ] = useState([])
    const [ name, setName ] = useState('')
    const handleNameChange = e => {
        setName(e.target.value)
    }

    const [ center, setCenter ] = useState({
        lng: -71.098,
        lat: 42.34
    });

    const history = useHistory()

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
          
        function success(pos) {
            var crd = pos.coords;

            setCenter({
                lng: crd.longitude,
                lat: crd.latitude
            })
        }
          
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
          
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [])

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['drawing', 'places']
    })

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const polygonRef = useRef(null);
    const searchBoxRef = useRef(null)
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
        polygonRef.current = polygon;
            const path = polygon.getPath();
            listenersRef.current.push(
                path.addListener("set_at", onEdit),
                path.addListener("insert_at", onEdit),
                path.addListener("remove_at", onEdit)
            );
        const nextPath = polygonRef.current
            .getPath()
            .getArray()
            .map(latLng => {
                return { lat: latLng.lat(), lng: latLng.lng() };
            });
        setPath(nextPath);
        setFinished(true)
    }

    const containerStyle = {
        width: '100%',
        height: '800px'
    };

    const onLoadSearchBox = ref => {
        searchBoxRef.current = ref;
    }

    const onPlacesChanged = () => {
        if (polygonRef.current) {
            polygonRef.current.setMap(null);
            polygonRef.current = null;
            setPath([])
        }
        setCenter({
            lat: searchBoxRef.current.getPlaces()[0].geometry.location.lat(),
            lng: searchBoxRef.current.getPlaces()[0].geometry.location.lng()
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                territory: {
                    name,
                    points: path
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/territories`, configObj)
            .then(r => {
                if (!r.ok) { throw r }
                return r.json()
            })
            .then(d => {
                history.push(`/territories?territory=${d.territory.id}`)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div id="new-territory">
            <div id="new-territory-form">
                <h1>Add Territory</h1>
                <div className="input-row">
                    <label htmlFor="territoryName">Territory Name:</label>
                    <input type="text"
                    name="territoryName"
                    value={name}
                    onChange={handleNameChange} />
                </div>
                {finished && 
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Add Territory
                    </button>
                }
            </div>
            {isLoaded &&
                <GoogleMap mapContainerStyle={containerStyle}
                           center={center}
                           zoom={13}
                           onUnmount={onUnmount}>
                    <StandaloneSearchBox onLoad={onLoadSearchBox}
                                         onPlacesChanged={onPlacesChanged}>
                        <input type="text"
                               placeholder="Search for address"
                               style={{
                                    boxSizing: `border-box`,
                                    border: `1px solid transparent`,
                                    width: `240px`,
                                    height: `32px`,
                                    padding: `0 12px`,
                                    borderRadius: `3px`,
                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                    fontSize: `14px`,
                                    outline: `none`,
                                    textOverflow: `ellipses`,
                                    position: "absolute",
                                    top: "5px",
                                    left: "50%",
                                    marginLeft: "-120px"}} />
                    </StandaloneSearchBox>
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