import {TileLayer, useMap, useMapEvents} from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import 'leaflet.heat';
import {useEffect, useState} from 'react';
import {HealthMarker} from './HealthMarker';
import {healthPoints} from '../health-points';

export interface MapProps {
    onMoveEnd: (position: LatLng, zoomLevel: number) => void
}

export const Map: React.FC<MapProps> = ({onMoveEnd}) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [healthMarkers, setHealthMarkers] = useState<JSX.Element[]>([]);
    const map = useMap();

    const tileLayerUrl = 'https://api.mapbox.com/styles/v1/thefrogcouncil/cksleyr2s3nyn17pqgm8fg2ew/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhlZnJvZ2NvdW5jaWwiLCJhIjoiY2tzbGVyZmN3MDA0MDJvbWdvbmdoY3RyNCJ9.DTwqWeCHooHnxDwgCJ0sXw';

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            // @ts-ignore
            L.heatLayer(healthPoints, {radius: 100, max: 100, blur: 20}).addTo(map);
        }
        map.scrollWheelZoom.enable();
    }, [firstLoad, map]);

    useMapEvents({
        click(e) {
            const health = Math.floor(Math.random() * 100);
            setHealthMarkers([...healthMarkers, (
                <HealthMarker initialPosition={e.latlng} pointHealth={health} />
            )]);
        },
        moveend(e) {
            onMoveEnd(map.getCenter(), map.getZoom());
        }
    });

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={tileLayerUrl}
            />
            {healthMarkers}
        </>
    );
};
