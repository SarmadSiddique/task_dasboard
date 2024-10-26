import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import Autocomplete from "react-google-autocomplete";
import { useTranslation } from 'react-i18next';
import { Input } from 'reactstrap';

const GeoLocationAddress = ({ address, setAddress, isEdit = false, setCompanyLat, setCompanyLong }) => {
    const [isLocation, setIsLocation] = useState(false)
    const { t } = useTranslation()
    const [userLoaction, setUserLoaction] = useState()
    const [currentLocation, setCurrentLocation] = useState("")
    const [isInitail, setisInitail] = useState(false)
    const [locationDetails, setLocationDetails] = useState({
        currentLocation: null,
        latitude: null,
        longitude: null,
    });
    const autocompleteRef = useRef(null);
    useEffect(() => {
        if (userLoaction && locationDetails?.currentLocation) {
            setAddress(userLoaction?.formatted_address)
            setCompanyLat(locationDetails?.latitude)
            setCompanyLong(locationDetails?.longitude)
            // setCurrentLocation(userLoaction?.formatted_address)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoaction, locationDetails]);
    useEffect(() => {
        if (!isInitail && address) {
            setisInitail(true)
            setCurrentLocation(address || locationDetails.currentLocation)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, locationDetails]);
    const getLocation = () => {
        // setLoading(true);
        if (navigator.geolocation) {
            setIsLocation(true)
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc`
                        );
                        const address = response.data.results[1] || response.data.results[0];
                        setUserLoaction(address)
                        setCurrentLocation(address?.formatted_address)
                        setLocationDetails({
                            currentLocation: address?.formatted_address,
                            latitude: address?.geometry?.location?.lat,
                            longitude: address?.geometry?.location?.lng,
                        });

                    } catch (error) {
                        console.error("Error fetching address:", error);
                    } finally {
                        // setLoading(false);
                        setIsLocation(false)
                    }
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                    //   setLoading(false);
                    setIsLocation(false)
                }
            );
            setIsLocation(true)
        } else {
            console.log("Geolocation is not supported by this browser.");
            setIsLocation(false)
            //   setLoading(false);
        }
    };
    return (
        <>

            {isEdit ?
                currentLocation ?
                    <Input
                        type="text"
                        className="form-control "
                        id="address"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        disabled={!isEdit}
                        placeholder={t('address')}
                        name="address"
                    /> :
                    <Autocomplete
                        ref={autocompleteRef}
                        className='w-full border popins_regular w-100 py-2 px-3 rounded-3 bg-light text-dark'
                        placeholder='Search location..'
                        apiKey='AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc'

                        options={{
                              types: ['street_address', 'point_of_interest', 'postal_code', 'town_square', 'street_number'],
                        }}

                        // defaultValue={address || locationDetails.currentLocation}
                        onPlaceSelected={(place) => {
                            setUserLoaction(place)
                            setLocationDetails({
                                currentLocation: place?.formatted_address,
                                latitude: place?.geometry?.location.lat(),
                                longitude: place?.geometry?.location.lng(),
                            });
                        }}
                    /> : <Input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isEdit}
                    placeholder="1234 Main St"
                    name="address"
                />}
            {isEdit &&
                <div className="d-flex">
                    <button
                        type="button"
                        disabled={isLocation}
                        className="btn btn-soft-danger ms-auto mt-1 py-1 rounded-4"
                        style={{ fontSize: '13px' }}
                        onClick={getLocation}>
                        {isLocation ? <Spinner size="sm"></Spinner> :
                            t('location_btn')}
                    </button>
                </div>}

        </>
    )
}

export default GeoLocationAddress