import { useState } from 'react';

function CoordinateInput() {
    const [coordinates, setCoordinates] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [timestamp, setTimestamp] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'latitude': setLatitude(value);
                break;
            case 'longitude': setLongitude(value);
                break;
            case 'timestamp': setTimestamp(value);
                break;
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            const array = fileContent.replaceAll("\n",",").split(",");

            // Clear coordinates before adding new ones
            setCoordinates([]);

            // Loop through the array with step 3 to create coordinate objects
            for (let i = 3; i < array.length; i += 3) {
                // Check if there are enough elements to form a coordinate object
                if (i + 2 < array.length) {
                    const timestamp = array[i];
                    const latitude = array[i + 1];
                    const longitude = array[i + 2];

                    // Add the coordinate object to the coordinates state
                    setCoordinates(prevCoordinates => [
                        ...prevCoordinates,
                        { timestamp, latitude, longitude }
                    ]);
                }
            }
            setFileData(fileContent);
        };

        reader.readAsText(file);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCoordinates(prevCoordinates => [...prevCoordinates, { timestamp, latitude, longitude }]);
        setLatitude('');
        setLongitude('');
    };

    return (
        <div>
            <h1>Time Series Latitude and Longitude Input</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Timestamp:</label>
                    <input
                        type="text"
                        name="timestamp"
                        value={timestamp}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input
                        type="text"
                        name="latitude"
                        value={latitude}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input
                        type="text"
                        name="longitude"
                        value={longitude}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit">Add Coordinates</button>
                </div>
            </form>
            <h2>Or</h2>
            <div>
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
            <h2>Coordinates:</h2>
            <ul>
                {coordinates.map((coord, index) => (
                    <li key={index}>{`Timestamp: ${coord.timestamp}, Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`}</li>
                ))}
            </ul>
            <p>{fileData}</p>
        </div>
    );
}

export default CoordinateInput;
