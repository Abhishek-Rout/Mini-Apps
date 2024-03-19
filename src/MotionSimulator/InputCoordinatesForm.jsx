import { useState } from 'react';
import InputForm from './InputForm';
import "./Styles.css";

function InputCoordinatesForm({ handleMapCoordinate }) {
    const [allCoordinates, setAllCoordinates] = useState([]);
    const [index, setIndex] = useState(0);

    const handleAddCoordinate = () => {
        setIndex(prevIndex => prevIndex + 1);
    };

    const handleCoordinate = (coordinate, coordinateIndex) => {
        setAllCoordinates(prevCoordinates => {
            const updatedCoordinates = [...prevCoordinates];
            if (updatedCoordinates[coordinateIndex] === undefined) {
                updatedCoordinates[coordinateIndex] = [];
            }
            updatedCoordinates[coordinateIndex] = [...coordinate];
            handleMapCoordinate(updatedCoordinates);
            return updatedCoordinates;
        });
    };

    return (
        <div>
            <h1>Enter Coordinates</h1>
            {Array.from({ length: index + 1 }).map((_, i) => (
                <div key={i}>
                    <h2>Coordinate Pair {i}</h2>
                    <InputForm
                        key={i}
                        handleCoordinate={handleCoordinate}
                        index={i}
                    />
                </div>
            ))}
            <div>
                <button onClick={handleAddCoordinate}>Add Coordinate Pair</button>
            </div>
            <h2>Coordinates:</h2>
            {allCoordinates.map((pair, pairIndex) => (
                <details key={pairIndex}>
                    <summary>Drone {pairIndex}</summary>

                    <table key={pairIndex}>
                        <tr>
                            <th>Timestamp</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                        {pair.map((coordinate, coordinateIndex) => (
                            <tr key={coordinateIndex}>
                                <td>{coordinate.timestamp}</td>
                                <td>{coordinate.lat}</td>
                                <td>{coordinate.lng}</td>
                            </tr>
                        ))}
                    </table>
                </details>
            ))}
        </div>
    );
}

export default InputCoordinatesForm;
