import { Button, TextField, Typography } from '@mui/material';
import {
  DrawingManager,
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { config } from '../../constants';
import { useHistory } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';

const NewTerritory = () => {
  const { currentUser } = useUserContext();
  const [finished, setFinished] = useState(false);
  const [edit, setEdit] = useState(false);
  const [path, setPath] = useState([]);
  const [name, setName] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [center, setCenter] = useState({
    lng: -71.098,
    lat: 42.34,
  });

  const history = useHistory();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;

      setCenter({
        lng: crd.longitude,
        lat: crd.latitude,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['drawing', 'places'],
  });

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const polygonRef = useRef(null);
  const searchBoxRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  const onLoad = (drawingManager) => {
    console.log(drawingManager);
  };

  const onPolygonComplete = (polygon) => {
    polygonRef.current = polygon;
    const path = polygon.getPath();
    listenersRef.current.push(
      path.addListener('set_at', onEdit),
      path.addListener('insert_at', onEdit),
      path.addListener('remove_at', onEdit),
    );
    const nextPath = polygonRef.current
      .getPath()
      .getArray()
      .map((latLng) => {
        return { lat: latLng.lat(), lng: latLng.lng() };
      });
    setPath(nextPath);
    setFinished(true);
  };

  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  const onLoadSearchBox = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
      setPath([]);
    }
    setCenter({
      lat: searchBoxRef.current.getPlaces()[0].geometry.location.lat(),
      lng: searchBoxRef.current.getPlaces()[0].geometry.location.lng(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        territory: {
          name,
          points: path,
        },
      }),
    };
    fetch(
      // eslint-disable-next-line react/prop-types
      `${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories`,
      configObj,
    )
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        history.push(`/territories?territory=${d.territory.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Typography variant="h1">Add Territory</Typography>
      <Box mb={4} display="flex" flexDirection="column">
        <TextField
          margin="normal"
          label="Territory Name"
          helperText="Enter a name for the territory and enter its boundaries in the map below."
          value={name}
          onChange={handleNameChange}
        />
        {finished && (
          <Button variant="contained" onClick={handleSubmit}>
            Add Territory
          </Button>
        )}
      </Box>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onUnmount={onUnmount}
        >
          <StandaloneSearchBox onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged}>
            <input
              type="text"
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
                position: 'absolute',
                top: '5px',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </StandaloneSearchBox>
          <DrawingManager
            onLoad={onLoad}
            drawingMode={finished ? null : 'polygon'}
            onPolygonComplete={onPolygonComplete}
            options={{
              drawingControl: false,
              polygonOptions: {
                fillColor: '#ffff00',
                fillOpacity: 0.25,
                strokeWeight: 1,
                clickable: false,
                editable: true,
                zIndex: 1,
              },
            }}
          />
        </GoogleMap>
      )}
    </>
  );
};

export default NewTerritory;
