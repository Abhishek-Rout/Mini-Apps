import { Fragment, useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import LineAndMarker from "./LineAndMarker";
// import { sampleData } from "./sampleData";
import './Styles.css';

function MapContainer({ mapCoordinate }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    });

    const [center, setCenter] = useState({ lat: 18.5196, lng: 73.8554 });

    useEffect(() => {
        if (mapCoordinate && mapCoordinate.length > 0 && mapCoordinate[0].length > 0) {
            const firstCoordinate = mapCoordinate[0][0];
            setCenter({ lat: firstCoordinate.lat, lng: firstCoordinate.lng });
        }
    }, [mapCoordinate]);

    const paths = mapCoordinate?.map(data =>
        data.map(({ lat, lng }) => ({ lat, lng }))
    );

    return (
        <Fragment>
            <div style={{ height: window.innerHeight - 20, width: "100%", position: 'relative' }}>
                {loadError ? (
                    <div>Error loading map</div>
                ) : isLoaded ? (
                    <>
                        <GoogleMap
                            center={center}
                            zoom={12}
                            mapContainerStyle={{ width: "100%", height: "100%", right: 0, position: 'absolute' }}
                            options={{ mapTypeId: "roadmap", fullscreenControl: false }}
                        >
                            {paths?.map((path, index) => (
                                <LineAndMarker path={path} key={index} centerPosition={path[0]} markerIndex={index} setCenter={setCenter} />
                            ))}
                        </GoogleMap>
                    </>
                ) : (
                    <div>Loading map...</div>
                )}
            </div>
        </Fragment>
    );
}

export default MapContainer;
