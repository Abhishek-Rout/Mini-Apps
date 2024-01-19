import React from "react";

const AddNote = ({ inputText, setInputText, saveHandler }) => {
	const char = 200;
	const characterLimit = char - inputText.length;
	return (
		<div className='note new'>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={inputText}
				onChange={e => setInputText(e.target.value)}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit} Remaining
				</small>
				<button className='save' onClick={saveHandler}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
