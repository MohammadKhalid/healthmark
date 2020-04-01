import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';
import LocationSearchInput from './LocationSearchInput';
import Storage from './Storage';
const mapStyles = {
    width: '100%',
    height: '100%',
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            autocompleteLocation: "",
        }
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.autocompleteLocation.lat != null) {
            this.setState({
                autocompleteLocation: nextprops.autocompleteLocation
            })
        }
    }
    onMarkerClick = (props, marker, e) => {

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    seletedLocation = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (

            <div>
                {(this.state.autocompleteLocation == '') ?
                    <CurrentLocation
                        latlng={this.props.latlng}
                        centerAroundCurrentLocation
                        google={this.props.google}
                    >

                        <Marker onClick={this.onMarkerClick} name={'current location'} />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                            </div>
                        </InfoWindow>

                    </CurrentLocation>
                    :
                    <CurrentLocation
                        centerAroundCurrentLocation
                        google={this.props.google}
                    >

                        <Marker title="Location"
                            id={1}
                            onClick={this.onMarkerClick}
                            position={this.state.autocompleteLocation}
                            name={'Seleted Location'} />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{Storage.seletedLocationName}</h4>
                            </div>
                        </InfoWindow>

                    </CurrentLocation>

                }
            </div>

        );
    }
} export default GoogleApiWrapper({
    apiKey: 'AIzaSyAoh4bfriSEBkYOKNOs9Z3tQ117skweAUw'
})(MapContainer);