import { useState } from 'react';

function InputForm({ handleCoordinate, index }) {
    const [coordinates, setCoordinates] = useState([]);
    const [timestamp, setTimestamp] = useState('');
    const [lat, setlat] = useState('');
    const [lng, setlng] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'lat':
                setlat(parseFloat(value));
                break;
            case 'lng':
                setlng(parseFloat(value));
                break;
            case 'timestamp':
                setTimestamp(value);
                break;
            default:
                break;
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        let fileCoordinate = [];
        reader.onload = (e) => {
            const fileContent = e.target.result;
            const array = fileContent.replaceAll("\r\n", ",").split(",");
            for (let i = 3; i < array.length; i += 3) {
                let obj = {};
                if (i + 2 < array.length) {
                    obj[array[0]] = array[i];
                    obj[array[1]] = array[i + 1];
                    obj[array[2]] = array[i + 2];

                    // Add the coordinate object to the coordinates state
                    fileCoordinate = [...fileCoordinate, obj];
                }
            }
            const convertedCoordinate = fileCoordinate.map(item => ({
                timestamp: item.timestamp,
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude)
            }));

            handleCoordinate(convertedCoordinate, index);
        };

        reader.readAsText(file);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!timestamp || !lat || !lng) {
            alert("Please fill in all fields.");
            return;
        }
        const newCoordinate = { timestamp, lat, lng };
        setCoordinates(prevCoordinates => [...prevCoordinates, newCoordinate]);
        handleCoordinate([...coordinates, newCoordinate], index);
        setlat('');
        setlng('');
        setTimestamp('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Timestamp:</label>
                <input
                    type="text"
                    name="timestamp"
                    value={timestamp}
                    onChange={handleInputChange}
                />
                <label>Latitude:</label>
                <input
                    type="text"
                    name="lat"
                    value={lat}
                    onChange={handleInputChange}
                />
                <label>Longitude:</label>
                <input
                    type="text"
                    name="lng"
                    value={lng}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Coordinates</button>
            </form>
            <p>Or</p>
            <div>
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
        </>
    );
}

export default InputForm;
