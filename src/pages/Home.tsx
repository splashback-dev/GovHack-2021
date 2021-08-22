import React, {useState} from 'react';
import {MapContainer} from 'react-leaflet';
import {Map} from '../components/Map';
import {LatLng, LatLngTuple} from 'leaflet';

const defaultPosition: LatLngTuple = [-33.90817776739702, 151.10698699951175];
const defaultZoomLevel: number = 12;

export const Home: React.FC<any> = () => {
    const [initialPosition, setInitialPosition] = useState(defaultPosition);
    const [initialZoomLevel, setInitialZoomLevel] = useState(defaultZoomLevel);
    const [firstLoad, setFirstLoad] = useState(true);

    if (firstLoad) {
        setFirstLoad(false);
        const savedLatLng = localStorage.getItem('lastLocation')?.split(',').map(coord => parseFloat(coord));
        const savedZoomLevel = parseFloat(localStorage.getItem('lastZoomLevel') ?? '');
        if (savedLatLng && !isNaN(savedZoomLevel)) {
            setInitialPosition([savedLatLng[0], savedLatLng[1]]);
            setInitialZoomLevel(savedZoomLevel);
        }
    }

    const savePosition = (position: LatLng, zoomLevel: number) => {
        localStorage.setItem('lastLocation', `${position.lat},${position.lng}`);
        localStorage.setItem('lastZoomLevel', zoomLevel.toString());
    };

    return (
        <div className="h-full w-full flex justify-center items-center">
            <MapContainer className="h-full w-full" center={initialPosition} zoom={initialZoomLevel} scrollWheelZoom={false}>
                <Map onMoveEnd={savePosition} />
            </MapContainer>
        </div>
    );
};
