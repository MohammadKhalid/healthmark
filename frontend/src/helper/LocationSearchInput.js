import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Storage from './Storage';
import Map from './Maps';
export default class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '', autocompleteLocation: {
                lat: null,
                lng: null
            }
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        Storage.seletedLocationName = address;
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                Storage.selectedLocation = latLng
                this.props.changeAddress(address,latLng)
                this.setState({
                    autocompleteLocation: {
                        lat: latLng.lat,
                        lng: latLng.lng,
                    }
                })
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className="col-lg-12">
                            <label for=" ">Google Address</label>
                            <input
                                className="form-control txt_SearchUserName "
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    // className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <div className="col-lg-12 mt-3" style={{ height: 300 }}>
                    <Map latlng={this.props.latlng} autocompleteLocation={this.state.autocompleteLocation} />
                </div>
            </div>
        );
    }
}