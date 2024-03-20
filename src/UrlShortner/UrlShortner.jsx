import { useState, useEffect } from 'react';
import styles from './UrlShortner.module.scss';
import hash from '../utils/hash';

function UrlShortner() {
    const queryString = window.location.search;

    const apiUrl = import.meta.env.VITE_SHORT_URL_API;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                if (queryString.slice(1) !== '') {
                    window.location.replace(jsonData[queryString.slice(1)]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    // console.log(data);

    const [url, setUrl] = useState();
    const [shortendUrl, setShortenedUrl] = useState('');
    // Convert url into a hex
    const urlToHex = () => {
        const header = `${window.location.href}?`;
        const hashedURL = hash(url);
        const shortURL = header + hashedURL;
        setShortenedUrl(shortURL);

        const postData = { hash: hashedURL, url: url }; // Create object with hash and url properties
        const jsonString = JSON.stringify(postData); // Convert object to JSON string

        fetch(apiUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json" // Specify JSON content type
            },
            body: jsonString, // Send JSON string in the body
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error posting data:', error));
    }

    return (
        <div className={styles.UrlShortner}>
            <div className={styles.shortener}>
                <h2>URL shortener</h2>
                <input
                    placeholder='Enter URL'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} />
                <button onClick={urlToHex} >Submit</button>
                {shortendUrl &&
                    <div className={styles.shortener__viewShot}>
                        {shortendUrl}
                    </div>
                }
            </div>
        </div>
    );
}

export default UrlShortner;
