import './Spoon.css';
import { useState } from 'react';
import { useCursor } from '../CursorContext';

export default function Spoon() {
    const [isCursorChangedSpoon, setCursorChangedSpoon] = useState(false);
    const { changeCursor } = useCursor();

    const handleClickSpoon = () => {
        if (isCursorChangedSpoon) {
            changeCursor('auto');
        } else {
            changeCursor('url(/images/cursor-spoon.svg) 16 16, auto');
        }
        setCursorChangedSpoon(!isCursorChangedSpoon);
    };

    return (
        <div className='spoon-block'>
            <div className='block-instrument' onClick={handleClickSpoon}>
                <div className='spoon'></div>
            </div>
            <p className='name-instrument-helper'>ложка</p>
        </div>
    );
}
