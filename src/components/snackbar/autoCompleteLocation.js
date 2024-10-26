import React from 'react'
import Autocomplete from "react-google-autocomplete";

const AutoCompleteLocation = ({ autocompleteRef, locationDetails="", setUserLoaction, setLocationDetails }) => {
    return (
        <>
            <Autocomplete
                ref={autocompleteRef}
                className='w-full border popins_regular w-100 py-2 px-3 rounded-3'
                placeholder='Search location..'
                apiKey='AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc'
                options={{
                    types: ['hospital', 'pharmacy', 'bakery', 'country', 'post_office'],
                }}
                defaultValue={locationDetails.currentLocation}
                onPlaceSelected={(place) => {
                    setUserLoaction(place)
                    setLocationDetails({
                        currentLocation: place?.formatted_address,
                        latitude: place?.geometry?.location.lat(),
                        longitude: place?.geometry?.location.lng(),
                    });
                }}
            />
        </>
    )
}

export default AutoCompleteLocation