import { Fragment, useState, useEffect } from "react";
import {
    GoogleMap,
    PolylineF,
    MarkerF,
    useLoadScript,
} from "@react-google-maps/api";

function MapContainer() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    });

    const [cnt, setCnt] = useState(0);
    const [position, setPosition] = useState({ lat: 18.5196, lng: 73.8554 });
    const endPosition = { lat: 18.5558, lng: 73.8987 };

    useEffect(() => {
        const timer = setInterval(() => {
            setCnt((prevCnt) => prevCnt + 1);
        }, 1000);

        return () => clearInterval(timer); // Clear the interval on unmount
    }, []);

    useEffect(() => {
        if (cnt < 10) {
            const intermediatePoints = getIntermediatePoints(position, endPosition, 10);
            setPosition(intermediatePoints[cnt]);
        }
    }, [cnt]);

    function getIntermediatePoints(start, end, numPoints) {
        const latDiff = end.lat - start.lat;
        const lngDiff = end.lng - start.lng;

        const intermediatePoints = [];

        for (let i = 1; i <= numPoints; i++) {
            const lat = start.lat + (latDiff * i) / (numPoints + 1);
            const lng = start.lng + (lngDiff * i) / (numPoints + 1);

            intermediatePoints.push({ lat, lng });
        }

        return intermediatePoints;
    }

    const paths = [
        [
            { lat: 18.5196, lng: 73.8554 },
            { lat: 18.5558, lng: 73.8987 },
            { lat: 18.3653, lng: 73.7532 }
        ],
        [
            { lat: 18.6653, lng: 73.7532 },
            { lat: 18.6196, lng: 73.8554 },
            { lat: 18.6558, lng: 73.8987 }
        ]
    ];

    return (
        <Fragment>
            <div style={{ height: "90vh", width: "100%" }}>
                {loadError ? (
                    <div>Error loading map</div>
                ) : isLoaded ? (
                    <GoogleMap
                        center={{ lat: 18.5196, lng: 73.8554 }}
                        zoom={10}
                        mapContainerStyle={{ width: "100%", height: "100vh" }}
                        options={{ mapTypeId: "roadmap", fullscreenControl: false }}
                    >
                        <MarkerF position={position} />
                        {paths.map((path, index) => (
                            <PolylineF
                                key={index}
                                path={path}
                                options={{
                                    strokeColor: "#FF0000",
                                    strokeOpacity: 1,
                                    strokeWeight: 2
                                }}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div>Loading map...</div>
                )}
            </div>
        </Fragment>
    );
}

export default MapContainer;
