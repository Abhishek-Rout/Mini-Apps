import { useState } from 'react';
import styles from './UrlShortner.module.scss';
import hash from '../utils/hash';

function UrlShortner() {
    const [url, setUrl] = useState();
    const [shortendUrl, setShortenedUrl] = useState('');
    // Convert url into a hex
    const urlToHex = () => {
        setShortenedUrl(hash(url));
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
