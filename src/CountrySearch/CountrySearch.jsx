import { useEffect } from 'react'
import PropTypes from 'prop-types'

const CountrySearch = () => {
    const apiUrl = import.meta.env.VITE_COUNTRIES_NAME_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const jsonData = await response.json();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetch function
    }, []);
    return (
        <div>CountrySearch</div>
    )
}

CountrySearch.propTypes = {}

export default CountrySearch