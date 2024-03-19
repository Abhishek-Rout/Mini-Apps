import { useState } from 'react';
import InputCoordinatesForm from './InputCoordinatesForm';
import MapContainer from './MapContainer';

const MotionSimulator = () => {
    const [mapCoordinate, setMapCoordinate] = useState(null);
    const handleMapCoordinate = (coordinates) => {
        setMapCoordinate(coordinates);
    }
    return (
        <>
            <InputCoordinatesForm handleMapCoordinate={handleMapCoordinate} />
            <MapContainer mapCoordinate={mapCoordinate} />
        </>
    );
}

export default MotionSimulator