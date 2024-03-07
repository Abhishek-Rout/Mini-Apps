import { useState } from 'react';
import NotesList from './components/NotesList';
import Header from './components/Header';
import '../Notepad/App.css';

const Notepad = () => {
	const [darkMode, setDarkMode] = useState(false);
	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<NotesList />
			</div>
		</div>
	);
};

export default Notepad;
