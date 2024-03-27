import { useState } from 'react';

const Dictionary = () => {
    const [word, setWord] = useState('');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (searchWord) => {
        setLoading(true);
        setError(null);
        const apiUrl = `${import.meta.env.VITE_DICTIONARY_API_URL}${searchWord}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData(word.trim());
        }
    }

    const handleChange = (event) => {
        const value = event.target.value.trim();
        if (/^[a-zA-Z]+$/.test(value) || value === '') {
            setWord(value);
        }
    }

    const handleClick = () => {
        fetchData(word.trim());
    }

    return (
        <>
            <header>Dictionary</header>
            <div>
                <input type='text' onKeyDown={handleKeyDown} onChange={handleChange} />
                <button onClick={handleClick}>Search</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div>
                    {/* Display dictionary data */}
                    {console.log(data)}
                </div>
            )}
        </>
    )
}

export default Dictionary;
