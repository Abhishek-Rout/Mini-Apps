import { PolylineF, MarkerF } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Slider from "./Slider";
import "./Styles.css";

function LineAndMarker({ path, centerPosition, markerIndex, setCenter }) {
    const [index, setIndex] = useState(0);
    const [position, setPosition] = useState(centerPosition);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setPosition(path[index])
                setIndex(index + 1); // Reset index after reaching 10
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [index, isPlaying, path]);


    const handleSimulate = () => {
        setIndex(0); // Reset index
        setIsPlaying(true);
        setCenter(path[0]);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handleSlideChange = (index) => {
        setIsPlaying(false);
        setIndex(index);
        setPosition(path[index]);
    }
    return (
        <>
            <div className="controls">
                Drone {markerIndex}: <br/>
                <button onClick={handleSimulate}>Simulate</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handlePlay}>Play</button>
                <Slider index={index} onChange={handleSlideChange} max={path.length} />
            </div>
            <MarkerF position={position} label={'Drone ' + markerIndex.toString()} icon={{url: "https://img.icons8.com/?size=256&id=109452&format=png", scaledSize: new window.google.maps.Size(80, 80)}}/>
            <PolylineF
                key={index}
                path={path}
                options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 1,
                    strokeWeight: 2
                }}
            />
        </>)
}

export default LineAndMarker;