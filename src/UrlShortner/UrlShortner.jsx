import { useState, useEffect } from 'react';
import styles from './UrlShortner.module.scss';
import hash from '../utils/hash';

function UrlShortner() {
    const queryString = window.location.search;

    const apiUrl = import.meta.env.VITE_SHORT_URL_API;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    console.log(data);
    if (queryString.slice(1) !== '') {
        window.location.replace(data[queryString.slice(1)]);
    }

    const [url, setUrl] = useState();
    const [shortendUrl, setShortenedUrl] = useState('');
    // Convert url into a hex
    const urlToHex = () => {
        // const header = 'https://abhishek-rout.github.io/Mini-Apps/short.io/?';
        const header = `${window.location.href}?`;
        const hashedURL = hash(url);
        const shortURL = header + hashedURL;
        setShortenedUrl(shortURL);
        const data = {url: url, hash: hashedURL};
        fetch(apiUrl,
            {
                method: "POST",
                body: data,
            })
            .then(res => res.text());
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
