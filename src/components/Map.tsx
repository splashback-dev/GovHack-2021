import {TileLayer, useMap, useMapEvents} from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import 'leaflet-webgl-heatmap';
import {useEffect, useState} from 'react';
import {HealthMarker} from './HealthMarker';
import {healthPoints} from '../health-points';

export interface MapProps {
    onMoveEnd: (position: LatLng, zoomLevel: number) => void
}

export const Map: React.FC<MapProps> = ({onMoveEnd}) => {
    const [healthMarkers, setHealthMarkers] = useState<JSX.Element[]>([]);
    const map = useMap();

    const tileLayerUrl = 'https://api.mapbox.com/styles/v1/thefrogcouncil/cksleyr2s3nyn17pqgm8fg2ew/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhlZnJvZ2NvdW5jaWwiLCJhIjoiY2tzbGVyZmN3MDA0MDJvbWdvbmdoY3RyNCJ9.DTwqWeCHooHnxDwgCJ0sXw';

    useEffect(() => {
        map.scrollWheelZoom.enable();
        // @ts-ignore
        const heatmap = new L.webGLHeatmap({size: 1000});
        heatmap.setData(healthPoints);
        map.addLayer(heatmap);
    });

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
