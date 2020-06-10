import React, { Component } from 'react';
import Territory from './Territory';
import {GoogleApiWrapper} from 'google-maps-react';

class Home extends Component {
    // state = {
    //     addresses: []
    // }

    // componentDidMount(){
    //     const bounds = [{lng:-72.23746805087704,lat:41.7972495932332},
    //         {lng:-72.23579435245215,lat:41.79465804852801},
    //         {lng:-72.23489313022337,lat:41.7939381564018},
    //         {lng:-72.23193197147164,lat:41.792210382309726},
    //         {lng:-72.227404402655,lat:41.78953863994409},
    //         {lng:-72.22480802432861,lat:41.791186494203906},
    //         {lng:-72.22352056400177,lat:41.791986408183945},
    //         {lng:-72.22197561160957,lat:41.792338367172505},
    //         {lng:-72.22146062747885,lat:41.792498347892625},
    //         {lng:-72.22128896610162,lat:41.792706322231055},
    //         {lng:-72.21929340259501,lat:41.79475403353391},
    //         {lng:-72.21781282321918,lat:41.79624178274422},
    //         {lng:-72.21736221210477,lat:41.79667370346577},
    //         {lng:-72.2174051274484,lat:41.796865667296565},
    //         {lng:-72.2184780110544,lat:41.79768150716278},
    //         {lng:-72.2197010983649,lat:41.79868929501243},
    //         {lng:-72.22040920154465,lat:41.799601089410345},
    //         {lng:-72.22118167774076,lat:41.8010727301937},
    //         {lng:-72.2218468655769,lat:41.80166457619653},
    //         {lng:-72.22352056400177,lat:41.80265630589328},
    //         {lng:-72.22446470157509,lat:41.80230440356457},
    //         {lng:-72.22508697406579,lat:41.80238438153585},
    //         {lng:-72.2260096539673,lat:41.80300820628937},
    //         {lng:-72.22671775714706,lat:41.80353605326015},
    //         {lng:-72.22714691058964,lat:41.80375998702518},
    //         {lng:-72.22867040531003,lat:41.8046717092734},
    //         {lng:-72.22933559314525,lat:41.80518354765668},
    //         {lng:-72.23030118839038,lat:41.80614323360406},
    //         {lng:-72.232489870946,lat:41.80387195361387},
    //         {lng:-72.2351077069442,lat:41.80219243423599},
    //         {lng:-72.23652391330373,lat:41.80132866427103},
    //         {lng:-72.23901300326924,lat:41.79958509312876}]
    //     const territory = new this.props.google.maps.Polygon({paths: bounds})
    //     const geocoder = new this.props.google.maps.Geocoder()
    //     geocoder.geocode({address: "23 Storrs Heights Rd Storrs Mansfield, CT 06268"}, (results, status) => {
    //     if (status == 'OK') {
    //         console.log(results[0].geometry.location)
    //         if (this.props.google.maps.geometry.poly.containsLocation(results[0].geometry.location, territory)){
    //             this.setState(prevState => {
    //             return  {addresses: [...prevState.addresses, "23 Storrs Heights Rd Storrs Mansfield, CT 06268"]}
    //             })
    //         } else {
    //             console.log("out of bounds")
    //         }
    //     } else {
    //         console.log("something went wrong")
    //     }
    //     })
    // }

    render(){
        
        return(
            <div>
                <h1>Mansfield 20</h1>
                <Territory />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry']
})(Home)