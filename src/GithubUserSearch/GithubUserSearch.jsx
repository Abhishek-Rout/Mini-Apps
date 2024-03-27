import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const GithubUserSearch = () => {
    const apiUrl = import.meta.env.VITE_GITHUB_USER_API_URL;
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
        <div>GithubUserSearch</div>
    )
}

GithubUserSearch.propTypes = {}

export default GithubUserSearch