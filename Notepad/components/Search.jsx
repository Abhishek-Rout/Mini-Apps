import React from 'react';
import url from './constants';

const Search = ({ handleSearchNote }) => {
	let timer = 500, timeout;
	const debounce = (func) => {
		clearTimeout(timeout);
		timeout = setTimeout(func, timer);
	} 
	return (
		<div className='search'>
			<img src={url+'search.png'} alt='search' className='search-icons' size='1.3em' />
			<input
				onChange={(event) =>
					debounce(() =>{handleSearchNote(event.target.value)})}
				type='text'
				placeholder='type to search...'
			/>
		</div>
	);
};

export default Search;
