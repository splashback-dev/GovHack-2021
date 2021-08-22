import React, {useRef, useState} from 'react';
import {LatLng} from 'leaflet';
import {Marker, Popup} from 'react-leaflet';
import {Progress} from 'antd';

export interface HealthMarkerProps {
    initialPosition: LatLng;
    pointHealth: number;
}

const healthColors: {[x: number]: string} = {
    20: '#dc0000',
    40: '#dc8400',
    60: '#dcd100',
    80: '#acdc00',
    100: '#3ace00',
};

function getHealthColor(health: number, healthBound: number = 20): string {
    if (health < healthBound) {
        return healthColors[healthBound];
    }
    return getHealthColor(health, healthBound + 20);
}

export const HealthMarker: React.FC<HealthMarkerProps> = ({initialPosition, pointHealth}) => {
    const [position] = useState(initialPosition);
    const markerRef = useRef<any>(null);

    const friendlyPosition = `(${position.lat.toFixed(3)}, ${position.lng.toFixed(3)})`;

    return (
        <Marker
            draggable
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={140}  >
                <div className="flex flex-col items-center text-center" >
                    <Progress type="circle" strokeColor={getHealthColor(pointHealth)} percent={pointHealth} width={80} />
                    <span className="text-lg">Health</span>
                    <span>{friendlyPosition}</span>
                </div>
            </Popup>
        </Marker>
    );
};
