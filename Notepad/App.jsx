import { useState } from 'react';
import NotesList from './components/NotesList';
import Header from './components/Header';

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
