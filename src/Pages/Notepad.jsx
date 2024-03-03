import { useState } from 'react';
import NotesList from '../Notepad/components/NotesList';
import Header from '../Notepad/components/Header';

const App = () => {

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

export default App;
