import { url } from '../utils/constants';

const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
	return (
		<div className='note'>
			<span>{text}</span>
			<div className='note-footer'>
				<p>{date}</p>
				<img
					src={url + 'edit.png'}
					onClick={() => handleEditNote(id, text)}
					className='delete-icon'
					size='0.6em'
					alt='edit'
				/>
				<img
					src={url + 'delete.png'}
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='0.6em'
					alt='delete'
				/>
			</div>
		</div>
	);
};

export default Note;
