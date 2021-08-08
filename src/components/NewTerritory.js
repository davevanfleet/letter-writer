import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLoadScript, GoogleMap, DrawingManager, StandaloneSearchBox } from '@react-google-maps/api';


const NewTerritory = (props) => {
    const [ finished, setFinished ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ path, setPath ] = useState([])

    const [ center, setCenter ] = useState({
        lng: -71.098,
        lat: 42.34
    });

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

    const [ name, setName ] = useState('')
    const handleNameChange = e => {
        setName(e.target.value)
    }

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

    const onLoadSearchBox = ref => searchBoxRef.current = ref;

    const onPlacesChanged = () => {
        setCenter({
            lat: searchBoxRef.current.getPlaces()[0].geometry.location.lat(),
            lng: searchBoxRef.current.getPlaces()[0].geometry.location.lng()
        })
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
                           zoom={13}
                           onUnmount={onUnmount}>
                    <StandaloneSearchBox onLoad={onLoadSearchBox}
                                         onPlacesChanged={onPlacesChanged}>
                        <input type="text"
                               placeholder="Customized your placeholder"
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