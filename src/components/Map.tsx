import {TileLayer, useMap, useMapEvents} from 'react-leaflet';
import {LatLng} from 'leaflet';

export interface MapProps {
    onMoveEnd: (position: LatLng) => void
}

export const Map: React.FC<MapProps> = ({onMoveEnd}) => {
    const map = useMap();
    map.scrollWheelZoom.enable();

    const tileLayerUrl = 'https://api.mapbox.com/styles/v1/thefrogcouncil/cksleyr2s3nyn17pqgm8fg2ew/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhlZnJvZ2NvdW5jaWwiLCJhIjoiY2tzbGVyZmN3MDA0MDJvbWdvbmdoY3RyNCJ9.DTwqWeCHooHnxDwgCJ0sXw';

    useMapEvents({
        click(e) {
            console.log(e.latlng);
        },
        moveend(e) {
            onMoveEnd(map.getCenter());
        }
    });

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={tileLayerUrl}
            />
        </>
    );
};
