import React, {useState} from 'react';
import {MapContainer} from 'react-leaflet';
import {Map} from '../components/Map';
import {LatLng, LatLngTuple} from 'leaflet';

const defaultPosition: LatLngTuple = [-33.865143, 151.209900];

export const Home: React.FC<any> = () => {
    const [initialPosition, setInitialPosition] = useState(defaultPosition);
    const [firstLoad, setFirstLoad] = useState(true);

    if (firstLoad) {
        setFirstLoad(false);
        const latLng = localStorage.getItem('lastLocation')?.split(',').map(coord => parseFloat(coord));
        if (latLng) {
            setInitialPosition([latLng[0], latLng[1]]);
        }
    }

    const savePosition = (position: LatLng) => {
        localStorage.setItem('lastLocation', `${position.lat},${position.lng}`);
    };

    return (
        <div className="h-full w-full flex justify-center items-center">
            <MapContainer className="h-full w-full" center={initialPosition} zoom={13} scrollWheelZoom={false}>
                <Map onMoveEnd={savePosition} />
            </MapContainer>
        </div>
    );
};
