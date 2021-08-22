import {TileLayer, useMap, useMapEvents} from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import 'leaflet.heat';
import {useEffect, useState} from 'react';
import {HealthMarker} from './HealthMarker';
import {healthPoints} from '../health-points';
import {healthPointChunks} from '../health-point-chunks';

const getClosestPoint = (point: LatLng) => {
    const chunks: any = healthPointChunks;
    const rowLats = Object.keys(chunks);

    let rowLat = null;
    let lastDiff = Math.abs(point.lat - parseFloat(rowLats[0]));
    for (let i=0; i < rowLats.length; ++i) {
        const lat = parseFloat(rowLats[i]);
        const diff = Math.abs(point.lat - lat);
        if (diff > lastDiff) {
            rowLat = i > 0 ? rowLats[i-1] : rowLats[0];
            break;
        }
        lastDiff = diff;
    }

    if (rowLat != null) {
        const chunk = chunks[rowLat];
        const points: any = healthPoints;
        lastDiff = Math.abs(point.lng - parseFloat(points[chunk.start].lng));
        for (let i=chunk.start; i <= chunk.end; ++i) {
            const testPoint = points[i];
            const lng = parseFloat(testPoint[1]);
            const diff = Math.abs(point.lng - lng);
            if (diff > lastDiff) {
                return testPoint;
            }
            lastDiff = diff;
        }
    }

    return null;
};

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
            const healthPointRaw: [number, number, number] = getClosestPoint(e.latlng);
            const healthPoint = new LatLng(...healthPointRaw);
            setHealthMarkers([...healthMarkers, (
                <HealthMarker initialPosition={e.latlng} pointHealth={healthPoint.alt!} />
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
