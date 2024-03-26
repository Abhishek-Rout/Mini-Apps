import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const AdviceGenerator = () => {
    const apiUrl = import.meta.env.VITE_ADVICE_API_URL;
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
        <div>AdviceGenerator</div>
    )
}

AdviceGenerator.propTypes = {}

export default AdviceGenerator