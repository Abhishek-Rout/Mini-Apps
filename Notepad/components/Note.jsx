import { url } from './constants';

const Note = ({ id, head, text, date, handleDeleteNote, handleEditNote }) => {
	return (
		<div className='note'>
			{head ? <h3>{head}</h3> : null}
			<span>{text}</span>
			<div className='note-footer'>
				<p>{date}</p>
				<div>
					<img
						src={url + 'edit.png'}
						onClick={() => handleEditNote(id, head, text)}
						className='icons'
						alt='edit'
					/>
					<img
						src={url + 'delete.png'}
						onClick={() => handleDeleteNote(id)}
						className='icons'
						alt='delete'
					/>
				</div>
			</div>
		</div>
	);
};

export default Note;
