import { useEffect, useState } from 'react';

function Slider({ index, onChange, max }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSliderChange = (event) => {
        setCurrentIndex(parseInt(event.target.value));
        onChange(currentIndex);
    };

    useEffect(()=> {
        setCurrentIndex(index);
    }, [index])

    return (
        <div style={{display: 'block'}}>
            <input
                type="range"
                min={0}
                max={max}
                value={currentIndex}
                onChange={handleSliderChange}
            />
        </div>
    );
}

export default Slider;
