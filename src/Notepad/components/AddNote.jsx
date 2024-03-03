import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const AddNote = ({ input, setInput, saveNote }) => {
	const wrapperRef = useRef(null);
	const handleInputChange = (field, value) => {
		setInput((prevInput) => ({ ...prevInput, [field]: value }));
	};

	useOutsideClick(wrapperRef, saveNote);

	return (
		<div className='note new' ref={wrapperRef}>
			<input placeholder='Title'
				value={input.head}
				onChange={e => handleInputChange('head', e.target.value)} />
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={input.text}
				onChange={e => handleInputChange('text', e.target.value)}
			></textarea>
			<div className='note-footer'>
				<small>{input.text?.length} characters</small>
				<button className='save' onClick={saveNote}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
